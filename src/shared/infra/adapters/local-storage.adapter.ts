import { StoragePersistor } from 'shared/application/storage-persistor.port';

export class LocalStorageAdapter<T = any> implements StoragePersistor<T> {
  set(key: string, value: T): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }

  get(key: string): T | null {
    return JSON.parse(localStorage.getItem(key)!);
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }
}
