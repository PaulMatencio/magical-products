import { Product, Category, Brand } from '../../types/types';

/**
 * Interface for Product/Inventory Repository.
 * This lives in the Domain Layer. It defines WHAT inventory actions
 * our application can perform, but not HOW they are implemented.
 */
export interface IProductRepository {
  fetchCategories(): Promise<Category[]>;
  fetchBrands(): Promise<Brand[]>;
  fetchProducts(): Promise<Product[]>;
  updateInventory(id: string, newQuantity: number, newInStock: boolean): Promise<void>;
  updateInventoryAtomic(id: string, amount: number): Promise<void>;
  getProductQuantity(id: string): Promise<number | null>;
  getProductQuantities(ids: string[]): Promise<{ id: string, quantity: number }[]>;
  batchUpdateInventory(updates: { id: string, newQuantity: number, newInStock: boolean }[]): Promise<void>;
}




