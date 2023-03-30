import { LocalStorageAdapter } from 'shared/infra/adapters/local-storage.adapter';
import { StoragePersistorFactory } from '../storage-persistor.factory';

describe('StoragePersistorFactory', () => {
  it('should return instance of LocalStorageAdapter', () => {
    expect(StoragePersistorFactory.create()).toBeInstanceOf(
      LocalStorageAdapter,
    );
  });
});
