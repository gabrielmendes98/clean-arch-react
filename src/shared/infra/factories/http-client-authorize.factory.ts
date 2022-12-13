import { HttpClientService } from 'shared/application/http-client.port';
import { AxiosAdapter } from '../adapters/axios.adapter';
import { useUserStorage } from '../adapters/user-storage.adapter';
import { HttpClientAuthorize } from '../decorators/http-client-authorize.decorator';

export const makeHttpClientAutorize = (baseUrl: string): HttpClientService =>
  new HttpClientAuthorize(baseUrl, useUserStorage(), new AxiosAdapter(baseUrl));
