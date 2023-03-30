import { AuthenticationService } from 'authentication/domain/interfaces/authentication-service.interface';
import { HttpClientAxiosAdapter } from 'shared/infra/adapters/http-client-axios.adapter';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { AuthenticationHttpService } from '../services/authentication-http.service';
import { AuthenticationMemoryService } from '../services/authentication-memory.service';

export class AuthServiceFactory {
  static create(): AuthenticationService {
    return personsApiConfig.mock
      ? new AuthenticationMemoryService()
      : new AuthenticationHttpService(
          new HttpClientAxiosAdapter(personsApiConfig.baseUrl),
        );
  }
}
