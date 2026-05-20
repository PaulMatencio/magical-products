import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { IStorageRepository } from '../../../domain/repositories/IStorageRepository';
import { browserStorageRepository } from '../../../infrastructure/repositories/BrowserStorageRepository';
import { Product, Category, CartItem, Brand } from '../../../types/types';
import { AppError } from '../../../domain/errors/AppError';

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

      // Check for abandoned cart to restore
      const cartItems = this.storageRepo.getItem<CartItem[]>('product_cart');
      const shouldSave = this.storageRepo.getItem<string>('saveForLater') === 'true';

      if (cartItems && cartItems.length > 0 && !shouldSave) {
        console.log(`LoadCatalogUseCase: Restoring inventory for ${cartItems.length} items...`);

        const itemIds = cartItems.map(i => i.id);
        const currentQuantities = await this.productRepo.getProductQuantities(itemIds);

        if (currentQuantities.length > 0) {
          const updates = cartItems.map(item => {
            const current = currentQuantities.find(q => q.id === item.id);
            const currentQty = current?.quantity || 0;
            return {
              id: item.id,
              newQuantity: currentQty + item.cart_quantity,
              newInStock: true
            };
          });

          await this.productRepo.batchUpdateInventory(updates);
        }

        this.storageRepo.removeItem('product_cart');
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

