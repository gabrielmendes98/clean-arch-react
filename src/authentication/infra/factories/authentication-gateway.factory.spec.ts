import { AuthenticationHttpGateway } from 'authentication/infra/adapters/authentication-http-gateway.adapter';
import { AuthenticationMemoryGateway } from 'authentication/infra/adapters/authentication-memory-gateway.adapter';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { makeAuthGateway } from './authentication-gateway.factory';

describe('makeAuthGateway', () => {
  it('should return AuthenticationInMemoryService when mock is on', () => {
    personsApiConfig.mock = true;
    expect(makeAuthGateway()).toBeInstanceOf(AuthenticationMemoryGateway);
  });

  it('should return AuthenticationHttpService when mock is off', () => {
    personsApiConfig.mock = false;
    expect(makeAuthGateway()).toBeInstanceOf(AuthenticationHttpGateway);
  });
});
