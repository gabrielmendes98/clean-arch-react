import { UserStorageService } from 'shared/application/user-storage.port';

export const userStorageServiceMock: UserStorageService = {
  user: null,
  updateUser: jest.fn(),
  removeUser: jest.fn(),
};
