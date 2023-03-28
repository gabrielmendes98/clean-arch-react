import { HttpClientService } from 'shared/domain/interfaces/http-client.interface';
import { AxiosAdapter } from '../adapters/axios.adapter';

export const makeHttpClient = (baseUrl: string): HttpClientService =>
  new AxiosAdapter(baseUrl);
