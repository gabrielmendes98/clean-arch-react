export interface HttpClientService {
  baseUrl: string;
  get<Response>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>>;
  post<Response>(
    endpoint: string,
    body: any,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>>;
  put<Response>(
    endpoint: string,
    body: any,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>>;
  delete<Response>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<Response>>;
}

export type HttpClientOptions = {
  headers: any;
};

export type HttpMethod = 'post' | 'get' | 'put' | 'delete';

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body: T;
};
