import { StoragePersistor } from 'shared/application/storage-persistor.port';

export const storagePersistorMock: StoragePersistor<any> = {
  delete: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
};
