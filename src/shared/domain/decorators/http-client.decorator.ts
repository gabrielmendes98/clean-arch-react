import {
  HttpClientOptions,
  HttpClient,
  HttpResponse,
} from 'shared/domain/interfaces/http-client.interface';

export class HttpClientDecorator implements HttpClient {
  constructor(public baseUrl: string, protected httpClient: HttpClient) {}

  get<Response>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    return this.httpClient.get(endpoint, options);
  }

  post<Response>(
    endpoint: string,
    body: any,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    return this.httpClient.post(endpoint, body, options);
  }

  put<Response>(
    endpoint: string,
    body: any,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    return this.httpClient.put(endpoint, body, options);
  }

  delete<Response>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    return this.httpClient.delete(endpoint, options);
  }
}
