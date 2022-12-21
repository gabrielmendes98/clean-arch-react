import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { EmployeeHttpGateway } from '../adapters/employee-http-gateway.adapter';
import { EmployeeMemoryGateway } from '../adapters/employee-memory-gateway.adapter';
import { makeEmployeeGateway } from './employee-gateway.factory';

jest.mock('shared/infra/factories/http-client-authorize.factory');

describe('makeEmployeeApiService', () => {
  it('should return EmployeeInMemoryService when mock is on', () => {
    personsApiConfig.mock = true;
    expect(makeEmployeeGateway()).toBeInstanceOf(EmployeeMemoryGateway);
  });

  it('should return EmployeeHttpService when mock is off', () => {
    personsApiConfig.mock = false;
    expect(makeEmployeeGateway()).toBeInstanceOf(EmployeeHttpGateway);
  });
});
