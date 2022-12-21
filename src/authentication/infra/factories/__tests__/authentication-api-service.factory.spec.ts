import { AuthenticationHttpGateway } from 'authentication/infra/adapters/authentication-http-gateway.adapter';
import { AuthenticationMemoryGateway } from 'authentication/infra/adapters/authentication-memory-gateway.adapter';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { makeAuthApiService } from '../authentication-api-service.factory';

describe('makeHttpClient', () => {
  it('should return AuthenticationInMemoryService when mock is on', () => {
    personsApiConfig.mock = true;
    expect(makeAuthApiService()).toBeInstanceOf(AuthenticationMemoryGateway);
  });

  it('should return AuthenticationHttpService when mock is off', () => {
    personsApiConfig.mock = false;
    expect(makeAuthApiService()).toBeInstanceOf(AuthenticationHttpGateway);
  });
});
