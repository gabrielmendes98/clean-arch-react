import { EmployeeGateway } from 'employee/application/ports/employee-gateway.port';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { makeHttpClientAutorize } from 'shared/infra/factories/http-client-authorize.factory';
import { EmployeeHttpGateway } from '../adapters/employee-http-gateway.adapter';
import { EmployeeMemoryGateway } from '../adapters/employee-memory-gateway.adapter';

export const makeEmployeeGateway = (): EmployeeGateway =>
  personsApiConfig.mock
    ? new EmployeeMemoryGateway()
    : new EmployeeHttpGateway(makeHttpClientAutorize(personsApiConfig.baseUrl));
