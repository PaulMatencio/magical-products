import { Query } from 'appwrite';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { databases } from '../../services/appwrite';
import appConfig from '../../config/appConfig';
import { Product, Category, Brand } from '../../types/types';

export class AppwriteProductRepository implements IProductRepository {
  private databaseId = appConfig.appwrite.databaseId;
  private productsCollection = appConfig.appwrite.collections.products;
  private categoriesCollection = appConfig.appwrite.collections.categories;

  async fetchCategories(): Promise<Category[]> {
    try {
      const response = await databases.listDocuments(
        this.databaseId,
        this.categoriesCollection,
        [Query.orderAsc('title')]
      );

      return response.documents.map((doc: any) => ({
        ...doc,
        id: doc.$id,
        code: Number(doc.code || doc.id || doc.category_code),
        title: doc.title || doc.name
      })) as Category[];
    } catch (error) {
      console.error('AppwriteProductRepository: Error fetching categories:', error);
      return [];
    }
  }

  async fetchBrands(): Promise<Brand[]> {
    // Appwrite doesn't have a brands collection configured, return empty array fallback
    return [];
  }

  async fetchProducts(): Promise<Product[]> {
    try {
      const response = await databases.listDocuments(
        this.databaseId,
        this.productsCollection
      );

      return response.documents.map((doc: any) => ({
        id: doc.$id,
        name: doc.name,
        title: doc.title || 'Mysterious Products',
        description: doc.description || '',
        price: Number(doc.price || 0),
        category_id: doc.category_id,
        in_stock: doc.in_stock ?? true,
        quantity: Number(doc.quantity || 0),
        image_url: doc.image_url || "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=800&auto=format&fit=crop",
        barcode_id: doc.barcode_id,
        digital_passport_url: doc.digital_passport_url || '',
        attributes: doc.attributes || '',
        discount_percentage: doc.discount_percentage || 0
      }));
    } catch (error) {
      console.error('AppwriteProductRepository: Error fetching products:', error);
      throw error;
    }
  }

  async updateInventory(id: string, newQuantity: number, newInStock: boolean): Promise<void> {
    try {
      await databases.updateDocument(
        this.databaseId,
        this.productsCollection,
        id,
        {
          quantity: newQuantity,
          in_stock: newInStock
        }
      );
    } catch (error) {
      console.error('AppwriteProductRepository: Update error:', error);
      throw error;
    }
  }

  async getProductQuantity(id: string): Promise<number | null> {
    try {
      const doc = await databases.getDocument(
        this.databaseId,
        this.productsCollection,
        id
      );
      return Number(doc.quantity || 0);
    } catch (error) {
      console.error('AppwriteProductRepository: Get quantity error:', error);
      return null;
    }
  }



  async updateInventoryAtomic(id: string, amount: number): Promise<void> {
    // Appwrite doesn't have native atomic increments in the client SDK for specific attributes
    // unless using a Function. We implement a fetch-then-update logic.
    // Note: This is prone to race conditions if multiple users buy the same product simultaneously.
    try {
      const currentQuantity = await this.getProductQuantity(id);
      if (currentQuantity === null) throw new Error('Product not found');

      const newQuantity = currentQuantity - amount;
      if (newQuantity < 0) throw new Error('This item just went out of stock!');

      await this.updateInventory(id, newQuantity, newQuantity > 0);
    } catch (error) {
      throw error;
    }
  }

  async getProductQuantities(ids: string[]): Promise<{ id: string; quantity: number }[]> {
    try {
      const response = await databases.listDocuments(
        this.databaseId,
        this.productsCollection,
        [Query.equal('$id', ids)]
      );

      return response.documents.map((doc: any) => ({
        id: doc.$id,
        quantity: Number(doc.quantity || 0)
      }));
    } catch (error) {
      console.error('AppwriteProductRepository: Get quantities error:', error);
      throw error;
    }
  }

  async batchUpdateInventory(updates: { id: string; newQuantity: number; newInStock: boolean }[]): Promise<void> {
    // Parallel updates
    await Promise.all(updates.map(u =>
      this.updateInventory(u.id, u.newQuantity, u.newInStock)
    ));
  }
}

export const appwriteProductRepository = new AppwriteProductRepository();
