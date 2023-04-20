import { AuthenticationRepository } from 'authentication/domain/interfaces/authentication-repository.interface';
import { HttpClientAxiosAdapter } from 'shared/infra/adapters/http-client-axios.adapter';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { AuthenticationMemoryRepository } from '../repositories/authentication-memory.repository';
import { AuthenticationHttpRepository } from '../repositories/authentication-http.repository';

export class AuthRepositoryFactory {
  static create(): AuthenticationRepository {
    return personsApiConfig.mock
      ? new AuthenticationMemoryRepository()
      : new AuthenticationHttpRepository(
          new HttpClientAxiosAdapter(personsApiConfig.baseUrl),
        );
  }
}
