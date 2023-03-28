import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { AuthenticationHttpService } from '../services/authentication-http.service';
import { AuthenticationMemoryService } from '../services/authentication-memory.service';
import { makeAuthService } from './authentication-service.factory';

describe('makeAuthService', () => {
  it('should return AuthenticationInMemoryService when mock is on', () => {
    personsApiConfig.mock = true;
    expect(makeAuthService()).toBeInstanceOf(AuthenticationMemoryService);
  });

  it('should return AuthenticationHttpService when mock is off', () => {
    personsApiConfig.mock = false;
    expect(makeAuthService()).toBeInstanceOf(AuthenticationHttpService);
  });
});
