import { HttpClientService } from 'shared/domain/interfaces/http-client.interface';
import { AxiosAdapter } from '../adapters/axios.adapter';
import { useUserStorage } from '../hooks/use-user-storage.hook';
import { HttpClientAuthorize } from '../decorators/http-client-authorize.decorator';

export const makeHttpClientAutorize = (baseUrl: string): HttpClientService =>
  new HttpClientAuthorize(baseUrl, useUserStorage(), new AxiosAdapter(baseUrl));
