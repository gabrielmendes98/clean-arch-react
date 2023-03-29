import { UserStorageService } from 'authentication/domain/interfaces/user-storage.interface';
import {
  HttpClientOptions,
  HttpClientService,
  HttpResponse,
} from 'shared/domain/interfaces/http-client.interface';

export class HttpClientAuthorize implements HttpClientService {
  constructor(
    public baseUrl: string,
    private userService: UserStorageService,
    private httpClient: HttpClientService,
  ) {}

  get<Response>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    const headers = {
      ...options?.headers,
      'x-access-token': this.userService.user?.token,
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
      'x-access-token': this.userService.user?.token,
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
      'x-access-token': this.userService.user?.token,
    };
    return this.httpClient.put(endpoint, body, { ...options, headers });
  }
  delete<Response>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    const headers = {
      ...options?.headers,
      'x-access-token': this.userService.user?.token,
    };
    return this.httpClient.delete(endpoint, { ...options, headers });
  }
}
