export interface HttpClient<Response = any> {
  get: (url: string) => Promise<HttpResponse<Response>>;
  post: (url: string, body: any) => Promise<HttpResponse<Response>>;
  put: (url: string, body: any) => Promise<HttpResponse<Response>>;
  delete: (url: string) => Promise<HttpResponse<Response>>;
}

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
  body?: T;
};
