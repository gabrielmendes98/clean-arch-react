import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { EmployeeHttpService } from '../services/employee-http.service';
import { EmployeeMemoryService } from '../services/employee-memory.service';
import { makeEmployeeService } from './employee-service.factory';

jest.mock('shared/infra/factories/http-client-authorize.factory');

describe('makeEmployeeApiService', () => {
  it('should return EmployeeInMemoryService when mock is on', () => {
    personsApiConfig.mock = true;
    expect(makeEmployeeService()).toBeInstanceOf(EmployeeMemoryService);
  });

  it('should return EmployeeHttpService when mock is off', () => {
    personsApiConfig.mock = false;
    expect(makeEmployeeService()).toBeInstanceOf(EmployeeHttpService);
  });
});
