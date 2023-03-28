import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { makeHttpClientAutorize } from 'shared/infra/factories/http-client-authorize.factory';
import { EmployeeHttpService } from '../repositories/employee-http.repository';
import { EmployeeMemoryService } from '../repositories/employee-memory.repository';

export const makeEmployeeRepository = (): EmployeeRepository =>
  personsApiConfig.mock
    ? new EmployeeMemoryService()
    : new EmployeeHttpService(makeHttpClientAutorize(personsApiConfig.baseUrl));
