import { USER_STORAGE_KEY } from 'user/domain/constants/user-storage-key';
import { PersistedUser } from 'user/domain/interfaces/user-storage.interface';
import {
  HttpClient,
  HttpClientOptions,
  HttpResponse,
} from 'shared/domain/interfaces/http-client.interface';
import { StoragePersistor } from 'shared/domain/interfaces/storage-persistor.interface';
import { HttpClientDecorator } from 'shared/domain/decorators/http-client.decorator';
import { authConfig } from '../config/config';

export class HttpClientAuthDecorator extends HttpClientDecorator {
  private _token?: string;

  constructor(
    baseUrl: string,
    httpClient: HttpClient,
    private persistor: StoragePersistor<PersistedUser> | null = authConfig.persistor,
  ) {
    super(baseUrl, httpClient);
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
