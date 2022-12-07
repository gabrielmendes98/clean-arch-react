export interface StoragePersistor<T = any> {
  set(key: string, value: T): void;
  get(key: string): T | null;
  delete(key: string): void;
}
