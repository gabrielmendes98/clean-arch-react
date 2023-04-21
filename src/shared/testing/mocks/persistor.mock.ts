import { StoragePersistor } from 'shared/domain/interfaces/storage-persistor.interface';

export const storagePersistorMock: StoragePersistor<any> = {
  delete: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
};
