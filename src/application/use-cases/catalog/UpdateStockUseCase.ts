import { IProductRepository } from '../../../domain/repositories/IProductRepository';

export class UpdateStockUseCase {
  constructor(private productRepo: IProductRepository) { }

  async decrementStock(productId: string, amount: number = 1): Promise<void> {
    await this.productRepo.updateInventoryAtomic(productId, amount);
  }

  async incrementStock(productId: string, amount: number): Promise<void> {
    await this.productRepo.updateInventoryAtomic(productId, -amount);
  }

  async setStock(productId: string, quantity: number, inStock: boolean): Promise<void> {
    await this.productRepo.updateInventory(productId, quantity, inStock);
  }

  async batchUpdateStock(updates: { id: string, newQuantity: number, newInStock: boolean }[]): Promise<void> {
    const promises = updates.map(u => this.productRepo.updateInventory(u.id, u.newQuantity, u.newInStock));
    await Promise.all(promises);
  }
}
