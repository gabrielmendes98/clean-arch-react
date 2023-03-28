import { StoragePersistor } from 'shared/domain/interfaces/storage-persistor.interface';
import { LocalStorageAdapter } from '../adapters/local-storage.adapter';

export const makeStoragePersistor = <T = any>(): StoragePersistor<T> =>
  new LocalStorageAdapter();
