import { HttpClientService } from 'shared/application/http-client.port';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { makeHttpClientAutorize } from 'shared/infra/factories/http-client-authorize.factory';
import { EmployeesInMemoryHttpClient } from '../adapters/in-memory-http-client.adapter';

export const makeHttpClient = (): HttpClientService =>
  personsApiConfig.mock
    ? new EmployeesInMemoryHttpClient(personsApiConfig.baseUrl)
    : makeHttpClientAutorize(personsApiConfig.baseUrl);
