import { StoragePersistor } from 'shared/application/storage-persistor.port';
import { LocalStorageAdapter } from '../adapters/local-storage.adapter';

export const makeStoragePersistor = <T = any>(): StoragePersistor<T> =>
  new LocalStorageAdapter();
