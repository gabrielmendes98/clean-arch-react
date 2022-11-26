import { HttpClient } from 'shared/application/http-client';
import { AxiosAdapter } from 'shared/infra/adapters/axios.adapter';
import { EmployeesInMemoryHttpClientAdapter } from '../adapters/in-memory.adapter';

export const makeHttpClient = (baseUrl: string, mock: boolean): HttpClient =>
  mock
    ? new EmployeesInMemoryHttpClientAdapter(baseUrl)
    : new AxiosAdapter(baseUrl);
