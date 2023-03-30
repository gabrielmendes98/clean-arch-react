import { AuthenticationService } from 'authentication/domain/interfaces/authentication-service.interface';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { HttpClientFactory } from 'shared/infra/factories/http-client.factory';
import { AuthenticationHttpService } from '../services/authentication-http.service';
import { AuthenticationMemoryService } from '../services/authentication-memory.service';

export class AuthServiceFactory {
  static create(): AuthenticationService {
    return personsApiConfig.mock
      ? new AuthenticationMemoryService()
      : new AuthenticationHttpService(
          HttpClientFactory.create(personsApiConfig.baseUrl),
        );
  }
}
