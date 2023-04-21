import { ErrorDto } from '../dto/error.dto';

export interface HttpClient {
  baseUrl?: string;
  get<DTOResponse = any>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<DTOResponse>>;
  post<DTORequest = {}, DTOResponse = any>(
    endpoint: string,
    body: DTORequest,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<DTOResponse>>;
  put<DTORequest = {}, DTOResponse = any>(
    endpoint: string,
    body: DTORequest,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<DTOResponse>>;
  delete<DTOResponse = any>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<DTOResponse>>;
}

export type HttpClientOptions = {
  headers: any;
};

export type HttpMethod = 'post' | 'get' | 'put' | 'delete';

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<T = any> =
  | {
      statusCode:
        | HttpStatusCode.ok
        | HttpStatusCode.noContent
        | HttpStatusCode.created;
      body: T;
    }
  | {
      statusCode: Exclude<
        HttpStatusCode,
        HttpStatusCode.ok | HttpStatusCode.noContent | HttpStatusCode.created
      >;
      body: ErrorDto;
    };
