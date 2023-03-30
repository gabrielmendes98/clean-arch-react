import { UserStorage } from 'authentication/domain/interfaces/user-storage.interface';
import {
  HttpClientOptions,
  HttpClient,
  HttpResponse,
} from 'shared/domain/interfaces/http-client.interface';
import { useUserStorage } from '../hooks/use-user-storage.hook';

export class HttpClientAuthDecorator implements HttpClient {
  private _token?: string;

  constructor(
    public baseUrl: string,
    private httpClient: HttpClient,
    private userStorage: UserStorage = useUserStorage(),
  ) {
    this._token = this.userStorage.user?.token;
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
