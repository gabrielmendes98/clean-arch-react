import { ErrorDto } from '../dto/error.dto';

export interface HttpClientService {
  baseUrl?: string;
  get<DTOResponse = any>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<DTOResponse>>;
  post<DTOResponse = any>(
    endpoint: string,
    body: any,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<DTOResponse>>;
  put<DTOResponse = any>(
    endpoint: string,
    body: any,
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
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<T = any> =
  | {
      statusCode: HttpStatusCode.ok | HttpStatusCode.noContent;
      body: T;
    }
  | {
      statusCode: Exclude<
        HttpStatusCode,
        HttpStatusCode.ok | HttpStatusCode.noContent
      >;
      body: ErrorDto;
    };
