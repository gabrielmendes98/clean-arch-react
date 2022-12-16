import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { makeHttpClientAutorize } from 'shared/infra/factories/http-client-authorize.factory';
import { EmployeesInMemoryHttpClient } from '../adapters/in-memory-http-client.adapter';
import { makeHttpClient } from './http-client.factory';

jest.mock('shared/infra/factories/http-client-authorize.factory');

describe('makeHttpClient', () => {
  it('should return in memory client when mock is on', () => {
    personsApiConfig.mock = true;
    expect(makeHttpClient()).toBeInstanceOf(EmployeesInMemoryHttpClient);
  });

  it('should return makeHttpClientAutorize when mock is true', () => {
    personsApiConfig.mock = false;
    makeHttpClient();
    expect(makeHttpClientAutorize).toHaveBeenCalledWith(
      personsApiConfig.baseUrl,
    );
  });
});
