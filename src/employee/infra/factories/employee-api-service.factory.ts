import { EmployeeApiService } from 'employee/application/ports/employee-api-service.port';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { makeHttpClientAutorize } from 'shared/infra/factories/http-client-authorize.factory';
import { EmployeeHttpService } from '../adapters/employee-http-service';
import { EmployeeInMemoryService } from '../adapters/employee-in-memory-service';

export const makeEmployeeApiService = (): EmployeeApiService =>
  personsApiConfig.mock
    ? new EmployeeInMemoryService()
    : new EmployeeHttpService(makeHttpClientAutorize(personsApiConfig.baseUrl));
