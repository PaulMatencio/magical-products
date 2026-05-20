import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoadCatalogUseCase } from './LoadCatalogUseCase';
import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { IStorageRepository } from '../../../domain/repositories/IStorageRepository';

describe('LoadCatalogUseCase', () => {
  let mockProductRepo: IProductRepository;
  let mockStorageRepo: IStorageRepository;
  let useCase: LoadCatalogUseCase;

  beforeEach(() => {
    mockProductRepo = {
      fetchProducts: vi.fn().mockResolvedValue([{ id: '1', title: 'Product 1' }]),
      fetchCategories: vi.fn().mockResolvedValue([{ code: 1, title: 'Cat 1' }]),
      fetchBrands: vi.fn().mockResolvedValue([]),
      getProductQuantity: vi.fn(),
      getProductQuantities: vi.fn().mockResolvedValue([{ id: '1', quantity: 10 }]),
      updateInventory: vi.fn(),
      updateInventoryAtomic: vi.fn(),
      batchUpdateInventory: vi.fn(),
    } as unknown as IProductRepository;

    mockStorageRepo = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      key: vi.fn(),
      length: vi.fn(),
    } as unknown as IStorageRepository;

    useCase = new LoadCatalogUseCase(mockProductRepo, mockStorageRepo);
  });

  it('should fetch products and categories', async () => {
    const result = await useCase.execute();

    expect(mockProductRepo.fetchProducts).toHaveBeenCalled();
    expect(mockProductRepo.fetchCategories).toHaveBeenCalled();
    expect(mockProductRepo.fetchBrands).toHaveBeenCalled();
    expect(result.products).toHaveLength(1);
    expect(result.categories).toHaveLength(1);
    expect(result.brands).toHaveLength(0);
    expect(result.cartRestored).toBe(false);
  });

  it('should restore abandoned cart if present', async () => {
    const cartItems = [{ id: '1', cart_quantity: 2 }];
    vi.mocked(mockStorageRepo.getItem).mockImplementation((key) => {
      if (key === 'product_cart') return cartItems;
      if (key === 'saveForLater') return 'false';
      return null;
    });

    const onCartRestored = vi.fn();
    const result = await useCase.execute(onCartRestored);

    expect(mockProductRepo.getProductQuantities).toHaveBeenCalledWith(['1']);
    expect(mockProductRepo.batchUpdateInventory).toHaveBeenCalledWith([{ id: '1', newQuantity: 12, newInStock: true }]);
    expect(mockStorageRepo.removeItem).toHaveBeenCalledWith('product_cart');
    expect(onCartRestored).toHaveBeenCalled();
    expect(result.cartRestored).toBe(true);
  });

  it('should NOT restore cart if saveForLater is true', async () => {
    vi.mocked(mockStorageRepo.getItem).mockImplementation((key) => {
      if (key === 'product_cart') return [{ id: '1' }];
      if (key === 'saveForLater') return 'true';
      return null;
    });

    const result = await useCase.execute();

    expect(mockProductRepo.batchUpdateInventory).not.toHaveBeenCalled();
    expect(result.cartRestored).toBe(false);
  });
});
