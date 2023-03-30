import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { HttpClientFactory } from 'shared/infra/factories/http-client.factory';
import { EmployeeHttpRepository } from '../repositories/employee-http.repository';
import { EmployeeMemoryRepository } from '../repositories/employee-memory.repository';

export class EmployeeRepositoryFactory {
  static create(): EmployeeRepository {
    return personsApiConfig.mock
      ? new EmployeeMemoryRepository()
      : new EmployeeHttpRepository(
          HttpClientFactory.create(personsApiConfig.baseUrl),
        );
  }
}
