import { AuthenticationHttpService } from 'authentication/infra/adapters/authentication-http-service.port copy';
import { AuthenticationInMemoryService } from 'authentication/infra/adapters/authentication-in-memory-service.port';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { makeAuthApiService } from '../authentication-api-service.factory';

describe('makeHttpClient', () => {
  it('should return AuthenticationInMemoryService when mock is on', () => {
    personsApiConfig.mock = true;
    expect(makeAuthApiService()).toBeInstanceOf(AuthenticationInMemoryService);
  });

  it('should return AuthenticationHttpService when mock is off', () => {
    personsApiConfig.mock = false;
    expect(makeAuthApiService()).toBeInstanceOf(AuthenticationHttpService);
  });
});
