import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { AuthenticationMemoryRepository } from '../repositories/authentication-memory.repository';
import { AuthenticationHttpRepository } from '../repositories/authentication-http.repository';
import { AuthRepositoryFactory } from './authentication-repository.factory';

describe('AuthRepositoryFactory', () => {
  it('should return AuthenticationInMemoryService when mock is on', () => {
    personsApiConfig.mock = true;
    expect(AuthRepositoryFactory.create()).toBeInstanceOf(
      AuthenticationMemoryRepository,
    );
  });

  it('should return AuthenticationHttpService when mock is off', () => {
    personsApiConfig.mock = false;
    expect(AuthRepositoryFactory.create()).toBeInstanceOf(
      AuthenticationHttpRepository,
    );
  });
});
