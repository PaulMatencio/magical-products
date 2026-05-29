import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { IStorageRepository } from '../../../domain/repositories/IStorageRepository';
import { browserStorageRepository } from '../../../infrastructure/repositories/BrowserStorageRepository';
import { Product, Category, CartItem, Brand } from '../../../types/types';
import { AppError } from '../../../domain/errors/AppError';
import appConfig from '../../../config/appConfig';

export interface LoadCatalogResult {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  cartRestored: boolean;
}

export class LoadCatalogUseCase {
  constructor(
    private productRepo: IProductRepository,
    private storageRepo: IStorageRepository = browserStorageRepository
  ) { }

  async execute(onCartRestored?: () => void): Promise<LoadCatalogResult> {
    try {
      let cartRestored = false;

      // Check for abandoned cart keys to restore
      const cartKeys: string[] = [];
      const len = typeof this.storageRepo.length === 'function' ? this.storageRepo.length() || 0 : 0;

      if (len > 0) {
        for (let i = 0; i < len; i++) {
          const k = this.storageRepo.key(i);
          if (k) {
            if (k === 'product_cart' || (k.startsWith('product_cart_') && k !== 'product_cart_active_user')) {
              cartKeys.push(k);
            }
          }
        }
      }

      // Ensure legacy/default key is checked if not already captured
      if (!cartKeys.includes('product_cart')) {
        cartKeys.push('product_cart');
      }

      // Check if the cart is abandoned based on inactivity timeout
      const lastActivityStr = this.storageRepo.getItem<string>('last_activity_timestamp');
      const CART_TIMEOUT = (appConfig.cartInactivityTimeoutMinutes || 90) * 60 * 1000;

      let isAbandoned = false;
      if (lastActivityStr) {
        const lastActivity = parseInt(lastActivityStr, 10);
        if (!isNaN(lastActivity)) {
          const inactiveMs = Date.now() - lastActivity;
          if (inactiveMs >= CART_TIMEOUT) {
            isAbandoned = true;
          }
        }
      } else {
        // For backwards compatibility and unit tests: if last_activity_timestamp is not set
        // but cart items exist, we treat it as abandoned.
        isAbandoned = true;
      }

      const allCartItems: CartItem[] = [];
      const keysToClear: string[] = [];
      const shouldSave = this.storageRepo.getItem<string>('saveForLater') === 'true';

      if (!shouldSave && isAbandoned) {
        for (const key of cartKeys) {
          const items = this.storageRepo.getItem<CartItem[]>(key);
          if (items && Array.isArray(items) && items.length > 0) {
            allCartItems.push(...items);
            keysToClear.push(key);
          }
        }
      }

      if (allCartItems.length > 0) {
        // Group by product ID and sum quantities
        const groupedItems: { [id: string]: number } = {};
        for (const item of allCartItems) {
          if (item && item.id) {
            groupedItems[item.id] = (groupedItems[item.id] || 0) + (item.cart_quantity || 0);
          }
        }

        const uniqueItemIds = Object.keys(groupedItems);
        console.log(`LoadCatalogUseCase: Restoring inventory for ${uniqueItemIds.length} unique items across keys: ${keysToClear.join(', ')}...`);

        const currentQuantities = await this.productRepo.getProductQuantities(uniqueItemIds);

        if (currentQuantities.length > 0) {
          const updates = uniqueItemIds.map(id => {
            const current = currentQuantities.find(q => q.id === id);
            const currentQty = current?.quantity || 0;
            const cartQty = groupedItems[id];
            return {
              id,
              newQuantity: Math.min(100, currentQty + cartQty),
              newInStock: true
            };
          });

          await this.productRepo.batchUpdateInventory(updates);
        }

        // Clear all processed cart keys
        for (const key of keysToClear) {
          this.storageRepo.removeItem(key);
        }

        cartRestored = true;
        if (onCartRestored) onCartRestored();
      }



      // Fetch catalog data
      const [products, categories, brands] = await Promise.all([
        this.productRepo.fetchProducts(),
        this.productRepo.fetchCategories(),
        this.productRepo.fetchBrands()
      ]);

      return {
        products: products || [],
        categories: categories || [],
        brands: brands || [],
        cartRestored
      };
    } catch (err) {
      throw AppError.fromError(err);
    }
  }
}

