import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { EmployeeHttpService } from '../repositories/employee-http.repository';
import { EmployeeMemoryService } from '../repositories/employee-memory.repository';
import { makeEmployeeRepository } from './employee-repository.factory';

jest.mock('shared/infra/factories/http-client-authorize.factory');

describe('makeEmployeeApiService', () => {
  it('should return EmployeeInMemoryService when mock is on', () => {
    personsApiConfig.mock = true;
    expect(makeEmployeeRepository()).toBeInstanceOf(EmployeeMemoryService);
  });

  it('should return EmployeeHttpService when mock is off', () => {
    personsApiConfig.mock = false;
    expect(makeEmployeeRepository()).toBeInstanceOf(EmployeeHttpService);
  });
});
