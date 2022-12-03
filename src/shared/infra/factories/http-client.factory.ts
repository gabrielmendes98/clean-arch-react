import { HttpClientService } from 'shared/application/http-client.port';
import { AxiosAdapter } from '../adapters/axios.adapter';

export const makeHttpClient = (baseUrl: string): HttpClientService =>
  new AxiosAdapter(baseUrl);
