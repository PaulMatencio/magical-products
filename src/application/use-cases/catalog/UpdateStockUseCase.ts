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
    const results = await Promise.allSettled(
      updates.map(u => this.productRepo.updateInventory(u.id, u.newQuantity, u.newInStock))
    );

    const failures = results
      .map((r, i) => r.status === 'rejected' ? { update: updates[i], reason: r.reason } : null)
      .filter((f): f is { update: typeof updates[0], reason: any } => f !== null);

    if (failures.length > 0) {
      const messages = failures.map(f => f.reason.message || f.reason).join(', ');
      const err = new Error(`Inventory update failed for some items: ${messages}`);
      (err as any).failures = failures;
      throw err;
    }
  }
}
