/**
 * Interface for a generic key-value storage repository.
 * This lives in the Domain Layer to keep business logic platform-agnostic.
 */
export interface IStorageRepository {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  key(index: number): string | null;
  length(): number;
}
