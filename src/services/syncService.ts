// services/syncService.ts
import { supabase } from './supabase';

class SyncService {
    async syncToLocalStorage() {
        // Sync products
        const { data: products } = await supabase.from('products').select('*');
        if (products) localStorage.setItem('cache_products', JSON.stringify(products));

        // Sync categories
        const { data: categories } = await supabase.from('categories').select('*');
        if (categories) localStorage.setItem('cache_categories', JSON.stringify(categories));

        // Sync user orders
        const { data: orders } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
        if (orders) localStorage.setItem('cache_orders', JSON.stringify(orders));
    }

    setupRealtimeSync() {
        // Listen to changes on products table
        supabase
            .channel('cache-sync')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'products' },
                (payload) => this.handleChange(payload)
            )
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'orders' },
                (payload) => this.handleChange(payload)
            )
            .subscribe();
    }

    private handleChange(payload: any) {
        const cached = JSON.parse(localStorage.getItem('cache_products') || '[]');
        let updated;

        switch (payload.eventType) {
            case 'INSERT':
                updated = [...cached, payload.new];
                break;
            case 'UPDATE':
                updated = cached.map((t: any) => t.id === payload.new.id ? payload.new : t);
                break;
            case 'DELETE':
                updated = cached.filter((t: any) => t.id !== payload.old.id);
                break;
        }

        localStorage.setItem('cache_products', JSON.stringify(updated));
        // Dispatch custom event for React to re-render
        window.dispatchEvent(new CustomEvent('products-updated', { detail: updated }));
    }
}

export const syncService = new SyncService();