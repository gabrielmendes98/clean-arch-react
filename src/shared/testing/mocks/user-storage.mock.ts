import { UserStorageService } from 'shared/domain/interfaces/user-storage.interface';

export const userStorageServiceMock: UserStorageService = {
  user: null,
  updateUser: jest.fn(),
  removeUser: jest.fn(),
};
