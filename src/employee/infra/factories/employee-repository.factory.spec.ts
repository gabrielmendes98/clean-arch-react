import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { EmployeeHttpRepository } from '../repositories/employee-http.repository';
import { EmployeeMemoryRepository } from '../repositories/employee-memory.repository';
import { EmployeeRepositoryFactory } from './employee-repository.factory';

jest.mock('authentication/infra/factories/http-client-authorize.factory');

describe('EmployeeRepositoryFactory', () => {
  it('should return EmployeeInMemoryService when mock is on', () => {
    personsApiConfig.mock = true;
    expect(EmployeeRepositoryFactory.create()).toBeInstanceOf(
      EmployeeMemoryRepository,
    );
  });

  it('should return EmployeeHttpService when mock is off', () => {
    personsApiConfig.mock = false;
    expect(EmployeeRepositoryFactory.create()).toBeInstanceOf(
      EmployeeHttpRepository,
    );
  });
});
