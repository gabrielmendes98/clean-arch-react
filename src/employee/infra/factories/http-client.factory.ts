import { HttpClient } from 'shared/application/http-client';
import { AxiosAdapter } from 'shared/infra/adapters/axios.adapter';
import { EmployeesInMemoryHttpClient } from '../adapters/in-memory.adapter';

export const makeHttpClient = (baseUrl: string, mock: boolean): HttpClient =>
  mock ? new EmployeesInMemoryHttpClient(baseUrl) : new AxiosAdapter(baseUrl);
