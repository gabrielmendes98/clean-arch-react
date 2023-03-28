import { EmployeeService } from 'employee/domain/interfaces/employee-service.interface';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { makeHttpClientAutorize } from 'shared/infra/factories/http-client-authorize.factory';
import { EmployeeHttpService } from '../services/employee-http.service';
import { EmployeeMemoryService } from '../services/employee-memory.service';

export const makeEmployeeService = (): EmployeeService =>
  personsApiConfig.mock
    ? new EmployeeMemoryService()
    : new EmployeeHttpService(makeHttpClientAutorize(personsApiConfig.baseUrl));
