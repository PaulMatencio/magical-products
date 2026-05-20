import { IStorageRepository } from '../../domain/repositories/IStorageRepository';

/**
 * Browser implementation of IStorageRepository using localStorage.
 * This lives in the Infrastructure Layer.
 */
export class BrowserStorageRepository implements IStorageRepository {
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      // If not JSON, return as is (e.g. simple strings)
      return item as unknown as T;
    }
  }

  setItem<T>(key: string, value: T): void {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  length(): number {
    return localStorage.length;
  }
}

export const browserStorageRepository = new BrowserStorageRepository();
