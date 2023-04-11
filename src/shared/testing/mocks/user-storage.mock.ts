import { UserStorage } from 'authentication/domain/interfaces/user-storage.interface';

export const userStorageServiceMock: UserStorage = {
  user: null,
  updateUser: jest.fn(),
  removeUser: jest.fn(),
};
