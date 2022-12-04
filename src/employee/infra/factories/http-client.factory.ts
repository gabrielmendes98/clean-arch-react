import { HttpClientService } from 'shared/application/http-client.port';
import { AxiosAdapter } from 'shared/infra/adapters/axios.adapter';
import { EmployeesInMemoryHttpClient } from '../adapters/in-memory-http-client.adapter';

export const makeHttpClient = (
  baseUrl: string,
  mock: boolean,
): HttpClientService =>
  mock ? new EmployeesInMemoryHttpClient(baseUrl) : new AxiosAdapter(baseUrl);
