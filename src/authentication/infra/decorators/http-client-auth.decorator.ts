import { USER_STORAGE_KEY } from 'authentication/domain/constants/user-storage-key';
import { PersistedUser } from 'authentication/domain/interfaces/user-storage.interface';
import {
  HttpClientOptions,
  HttpClient,
  HttpResponse,
} from 'shared/domain/interfaces/http-client.interface';
import { StoragePersistor } from 'shared/domain/interfaces/storage-persistor.interface';
import { authConfig } from '../config/config';

export class HttpClientAuthDecorator implements HttpClient {
  private _token?: string;

  constructor(
    public baseUrl: string,
    private httpClient: HttpClient,
    private persistor: StoragePersistor<PersistedUser> | null = authConfig.persistor,
  ) {
    const user = this.persistor?.get(USER_STORAGE_KEY);
    this._token = user?.token;
  }

  get<Response>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    const headers = {
      ...options?.headers,
      'x-access-token': this._token,
    };
    return this.httpClient.get(endpoint, { ...options, headers });
  }
  post<Response>(
    endpoint: string,
    body: any,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    const headers = {
      ...options?.headers,
      'x-access-token': this._token,
    };
    return this.httpClient.post(endpoint, body, { ...options, headers });
  }
  put<Response>(
    endpoint: string,
    body: any,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    const headers = {
      ...options?.headers,
      'x-access-token': this._token,
    };
    return this.httpClient.put(endpoint, body, { ...options, headers });
  }
  delete<Response>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    const headers = {
      ...options?.headers,
      'x-access-token': this._token,
    };
    return this.httpClient.delete(endpoint, { ...options, headers });
  }
}
