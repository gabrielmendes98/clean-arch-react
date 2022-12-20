import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { EmployeeHttpService } from '../adapters/employee-http-service';
import { EmployeeInMemoryService } from '../adapters/employee-in-memory-service';
import { makeEmployeeApiService } from './employee-api-service.factory';

jest.mock('shared/infra/factories/http-client-authorize.factory');

describe('makeEmployeeApiService', () => {
  it('should return EmployeeInMemoryService when mock is on', () => {
    personsApiConfig.mock = true;
    expect(makeEmployeeApiService()).toBeInstanceOf(EmployeeInMemoryService);
  });

  it('should return EmployeeHttpService when mock is off', () => {
    personsApiConfig.mock = false;
    expect(makeEmployeeApiService()).toBeInstanceOf(EmployeeHttpService);
  });
});
