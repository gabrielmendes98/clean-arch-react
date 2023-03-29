import { makeHttpClientAutorize } from 'authentication/infra/factories/http-client-authorize.factory';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { EmployeeHttpRepository } from '../repositories/employee-http.repository';
import { EmployeeMemoryRepository } from '../repositories/employee-memory.repository';

export class EmployeeRepositoryFactory {
  static create(): EmployeeRepository {
    return personsApiConfig.mock
      ? new EmployeeMemoryRepository()
      : new EmployeeHttpRepository(
          makeHttpClientAutorize(personsApiConfig.baseUrl),
        );
  }
}
