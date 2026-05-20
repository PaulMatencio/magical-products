/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from './supabase';
import { Product, Category, Order } from '../types/types';

// Add type definitions for Supabase payloads
interface OrderRecord {
    id: string;
    user_id: string | null;
    created_at: string;
    total_price: number;
    status: string;
    payment_method: string;
    shipping_address: string;
    items: any[];
    is_guest: boolean;
}

interface ProductRecord {
    id: string;
    name: string;
    description: string;
    price: number;
    category_code: number;
    in_stock: boolean;
    quantity: number;
    image_url: string;
    created_at: string;
}

interface CategoryRecord {
    code: number;
    title: string;
}

interface CacheEntry<T> {
    data: T;
    timestamp: number;
    version: string;
    lastSync: number;
}

interface PendingOperation {
    id: string;
    type: 'UPDATE_STOCK' | 'CLEAR_CART' | 'CREATE_ORDER';
    payload: any;
    timestamp: number;
    retries: number;
}

class CacheService {
    private readonly CACHE_VERSION = '2.0.0';
    private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
    private readonly MAX_RETRIES = 3;
    private syncInterval: NodeJS.Timeout | null = null;
    private isOnline = navigator.onLine;

    constructor() {
        this.setupNetworkListeners();
        this.processPendingOperations();
    }

    // ============ Cache Management ============

    async getProducts(forceRefresh = false): Promise<Product[]> {
        const cacheKey = 'cache_products_v2';

        if (!forceRefresh) {
            const cached = this.getFromCache<Product[]>(cacheKey);
            if (cached && this.isCacheFresh(cached.timestamp)) {
                console.log('Cache: Using cached products');
                return cached.data;
            }
        }

        console.log('Cache: Fetching fresh products from Supabase');
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('name');

            if (error) throw error;

            if (data) {
                this.saveToCache(cacheKey, data);
                return data;
            }
        } catch (err) {
            console.error('Cache: Failed to fetch products', err);
            const cached = this.getFromCache<Product[]>(cacheKey);
            if (cached) {
                console.warn('Cache: Using stale products due to fetch error');
                return cached.data;
            }
            throw err;
        }

        return [];
    }

    async getCategories(forceRefresh = false): Promise<Category[]> {
        const cacheKey = 'cache_categories';

        if (!forceRefresh) {
            const cached = this.getFromCache<Category[]>(cacheKey);
            if (cached && this.isCacheFresh(cached.timestamp)) {
                return cached.data;
            }
        }

        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('code');

            if (error) throw error;

            if (data) {
                this.saveToCache(cacheKey, data);
                return data;
            }
        } catch (err) {
            console.error('Cache: Failed to fetch categories', err);
            const cached = this.getFromCache<Category[]>(cacheKey);
            if (cached) return cached.data;
        }

        return [];
    }

    async getOrdersForUser(userId: string): Promise<Order[]> {
        const cacheKey = `cache_orders_${userId}`;

        const cached = this.getFromCache<Order[]>(cacheKey);
        if (cached && this.isCacheFresh(cached.timestamp)) {
            return cached.data;
        }

        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                this.saveToCache(cacheKey, data);
                return data;
            }
        } catch (err) {
            console.error('Cache: Failed to fetch orders', err);
            if (cached) return cached.data;
        }

        return [];
    }

    // ============ Stock Management with Retry ============

    async updateStock(itemId: string, newQuantity: number, newInStock: boolean): Promise<boolean> {
        const operation: PendingOperation = {
            id: `stock_${itemId}_${Date.now()}`,
            type: 'UPDATE_STOCK',
            payload: { itemId, newQuantity, newInStock },
            timestamp: Date.now(),
            retries: 0
        };

        try {
            if (!this.isOnline) {
                await this.queueOperation(operation);
                console.log('Cache: Stock update queued for offline sync');
                return true;
            }

            const { error } = await supabase
                .from('products')
                .update({ quantity: newQuantity, in_stock: newInStock })
                .eq('id', itemId)
                .gte('quantity', 0);

            if (error) throw error;

            await this.updateCachedProduct(itemId, newQuantity, newInStock);
            return true;
        } catch (err) {
            console.error('Cache: Failed to update stock', err);
            await this.queueOperation(operation);
            return false;
        }
    }

    async bulkUpdateStock(updates: Array<{ id: string; newQuantity: number; newInStock: boolean }>): Promise<boolean> {
        const operation: PendingOperation = {
            id: `bulk_stock_${Date.now()}`,
            type: 'UPDATE_STOCK',
            payload: { updates },
            timestamp: Date.now(),
            retries: 0
        };

        try {
            if (!this.isOnline) {
                await this.queueOperation(operation);
                return true;
            }

            const results = await Promise.allSettled(
                updates.map(update =>
                    supabase
                        .from('products')
                        .update({ quantity: update.newQuantity, in_stock: update.newInStock })
                        .eq('id', update.id)
                        .gte('quantity', 0)
                )
            );

            const failed = results.filter(r => r.status === 'rejected');
            if (failed.length > 0) {
                console.warn(`Cache: ${failed.length} stock updates failed`);
                await this.queueOperation(operation);
                return false;
            }

            for (const update of updates) {
                await this.updateCachedProduct(update.id, update.newQuantity, update.newInStock);
            }
            return true;
        } catch (err) {
            console.error('Cache: Failed bulk stock update', err);
            await this.queueOperation(operation);
            return false;
        }
    }

    // ============ Cart Operations ============

    async saveCart(cart: any[], userId: string | null): Promise<void> {
        const cartKey = userId ? `cart_${userId}` : 'cart_guest';
        this.saveToCache(cartKey, cart, false);
    }

    async loadCart(userId: string | null): Promise<any[]> {
        const cartKey = userId ? `cart_${userId}` : 'cart_guest';
        const cached = this.getFromCache<any[]>(cartKey);
        return cached?.data || [];
    }

    async clearCart(userId: string | null): Promise<void> {
        const cartKey = userId ? `cart_${userId}` : 'cart_guest';
        localStorage.removeItem(cartKey);
    }

    // ============ Offline Queue Management ============

    private async queueOperation(operation: PendingOperation): Promise<void> {
        const queue = this.getPendingOperations();
        queue.push(operation);
        localStorage.setItem('pending_operations', JSON.stringify(queue));

        if (!this.syncInterval) {
            this.startSyncInterval();
        }
    }

    private getPendingOperations(): PendingOperation[] {
        const stored = localStorage.getItem('pending_operations');
        return stored ? JSON.parse(stored) : [];
    }

    private async processPendingOperations(): Promise<void> {
        const queue = this.getPendingOperations();
        if (queue.length === 0) return;

        console.log(`Cache: Processing ${queue.length} pending operations`);

        const remainingOps: PendingOperation[] = [];

        for (const op of queue) {
            const success = await this.executeOperation(op);

            if (!success && op.retries < this.MAX_RETRIES) {
                op.retries++;
                remainingOps.push(op);
            } else if (!success && op.retries >= this.MAX_RETRIES) {
                console.error(`Cache: Operation ${op.id} failed after ${this.MAX_RETRIES} retries`);
            }
        }

        localStorage.setItem('pending_operations', JSON.stringify(remainingOps));

        if (remainingOps.length === 0 && this.syncInterval) {
            this.stopSyncInterval();
        }
    }

    private async executeOperation(operation: PendingOperation): Promise<boolean> {
        try {
            switch (operation.type) {
                case 'UPDATE_STOCK':
                    if (operation.payload.updates) {
                        const results = await Promise.allSettled(
                            operation.payload.updates.map((update: any) =>
                                supabase
                                    .from('product')
                                    .update({ quantity: update.newQuantity, in_stock: update.newInStock })
                                    .eq('id', update.id)
                            )
                        );
                        return results.every(r => r.status === 'fulfilled');
                    } else {
                        const { error } = await supabase
                            .from('product')
                            .update({ quantity: operation.payload.newQuantity, in_stock: operation.payload.newInStock })
                            .eq('id', operation.payload.itemId);
                        return !error;
                    }

                case 'CLEAR_CART':
                    return true;

                default:
                    return false;
            }
        } catch (err) {
            console.error(`Cache: Failed to execute operation ${operation.id}`, err);
            return false;
        }
    }

    // ============ Real-time Subscriptions ============

    setupRealtimeSync(): () => void {
        const channel = supabase.channel('cache-sync');

        channel
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'products' },
                (payload) => {
                    console.log('Cache: Real-time product update', payload);
                    this.invalidateCache('cache_products');
                    window.dispatchEvent(new CustomEvent('products-changed', { detail: payload }));
                }
            )
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'categories' },
                () => {
                    this.invalidateCache('cache_categories');
                    window.dispatchEvent(new CustomEvent('categories-changed'));
                }
            )
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'orders' },
                (payload) => {
                    // 🔧 FIXED: Type assertion to access user_id
                    const newRecord = payload.new as OrderRecord | null;
                    const oldRecord = payload.old as OrderRecord | null;
                    const userId = newRecord?.user_id || oldRecord?.user_id;

                    if (userId) {
                        this.invalidateCache(`cache_orders_${userId}`);
                    }
                    window.dispatchEvent(new CustomEvent('orders-changed', { detail: payload }));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }

    // ============ Helper Methods ============

    private getFromCache<T>(key: string): CacheEntry<T> | null {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        try {
            return JSON.parse(cached);
        } catch {
            return null;
        }
    }

    private saveToCache<T>(key: string, data: T, withExpiry = true): void {
        const entry: CacheEntry<T> = {
            data,
            timestamp: Date.now(),
            version: this.CACHE_VERSION,
            lastSync: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(entry));
    }

    private isCacheFresh(timestamp: number): boolean {
        return Date.now() - timestamp < this.CACHE_DURATION;
    }

    private invalidateCache(key: string): void {
        localStorage.removeItem(key);
    }

    private async updateCachedProduct(id: string, newQuantity: number, newInStock: boolean): Promise<void> {
        const cached = this.getFromCache<Product[]>('cache_products');
        if (cached) {
            const updatedProducts = cached.data.map(product =>
                product.id === id ? { ...product, quantity: newQuantity, in_stock: newInStock } : product
            );
            this.saveToCache('cache_products', updatedProducts);
        }
    }

    private setupNetworkListeners(): void {
        window.addEventListener('online', () => {
            console.log('Cache: Back online, syncing pending operations');
            this.isOnline = true;
            this.processPendingOperations();
        });

        window.addEventListener('offline', () => {
            console.log('Cache: Offline mode activated');
            this.isOnline = false;
        });
    }

    private startSyncInterval(): void {
        if (this.syncInterval) return;
        this.syncInterval = setInterval(() => {
            if (this.isOnline) {
                this.processPendingOperations();
            }
        }, 30000);
    }

    private stopSyncInterval(): void {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
    }

    clearAllCache(): void {
        const keysToKeep = ['pending_operations'];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('cache_') && !keysToKeep.includes(key)) {
                localStorage.removeItem(key);
            }
        }
    }
}

export const cacheService = new CacheService();