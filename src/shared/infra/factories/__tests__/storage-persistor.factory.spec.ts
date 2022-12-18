import { LocalStorageAdapter } from 'shared/infra/adapters/local-storage.adapter';
import { makeStoragePersistor } from '../storage-persistor.factory';

describe('makeStoragePersistor', () => {
  it('should return instance of LocalStorageAdapter', () => {
    expect(makeStoragePersistor()).toBeInstanceOf(LocalStorageAdapter);
  });
});
