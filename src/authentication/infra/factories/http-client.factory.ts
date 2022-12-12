import { HttpClientService } from 'shared/application/http-client.port';
import { AxiosAdapter } from 'shared/infra/adapters/axios.adapter';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { AuthenticationInMemoryHttpClient } from '../adapters/in-memory-http-client.adapter';

export const makeHttpClient = (): HttpClientService =>
  personsApiConfig.mock
    ? new AuthenticationInMemoryHttpClient(personsApiConfig.baseUrl)
    : new AxiosAdapter(personsApiConfig.baseUrl);
