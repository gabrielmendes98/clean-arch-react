import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { UserMemoryRepository } from '../repositories/user-memory.repository';
import { UserHttpRepository } from '../repositories/user-http.repository';
import { UserRepositoryFactory } from './user-repository.factory';

describe('UserRepositoryFactory', () => {
  it('should return UserInMemoryService when mock is on', () => {
    personsApiConfig.mock = true;
    expect(UserRepositoryFactory.create()).toBeInstanceOf(UserMemoryRepository);
  });

  it('should return UserHttpService when mock is off', () => {
    personsApiConfig.mock = false;
    expect(UserRepositoryFactory.create()).toBeInstanceOf(UserHttpRepository);
  });
});
