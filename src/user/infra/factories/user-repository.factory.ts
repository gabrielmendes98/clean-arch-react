import { HttpClientAxiosAdapter } from 'shared/infra/adapters/http-client-axios.adapter';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { UserHttpRepository } from '../repositories/user-http.repository';
import { UserMemoryRepository } from '../repositories/user-memory.repository';
import { UserRepository } from '../../domain/interfaces/user-repository.interface';

export class UserRepositoryFactory {
  static create(): UserRepository {
    return personsApiConfig.mock
      ? new UserMemoryRepository()
      : new UserHttpRepository(
          new HttpClientAxiosAdapter(personsApiConfig.baseUrl),
        );
  }
}
