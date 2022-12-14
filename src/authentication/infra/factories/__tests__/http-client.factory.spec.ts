import { AuthenticationInMemoryHttpClient } from 'authentication/infra/adapters/in-memory-http-client.adapter';
import { AxiosAdapter } from 'shared/infra/adapters/axios.adapter';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { makeHttpClient } from '../http-client.factory';

describe('makeHttpClient', () => {
  it('should return in memory client when mock is on', () => {
    personsApiConfig.mock = true;
    expect(makeHttpClient()).toBeInstanceOf(AuthenticationInMemoryHttpClient);
  });

  it('should return axios adapter client when mock is off', () => {
    personsApiConfig.mock = false;
    expect(makeHttpClient()).toBeInstanceOf(AxiosAdapter);
  });
});
