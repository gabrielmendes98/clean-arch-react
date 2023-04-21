import { StoragePersistor } from 'shared/domain/interfaces/storage-persistor.interface';
import { LocalStorageAdapter } from '../adapters/local-storage.adapter';

export class StoragePersistorFactory {
  static create<T = any>(): StoragePersistor<T> {
    return new LocalStorageAdapter();
  }
}
