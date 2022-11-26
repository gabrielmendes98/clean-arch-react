import { HttpClient } from 'shared/application/http-client';
import { AxiosAdapter } from '../adapters/axios.adapter';

export const makeHttpClient = (baseUrl: string): HttpClient =>
  new AxiosAdapter(baseUrl);
