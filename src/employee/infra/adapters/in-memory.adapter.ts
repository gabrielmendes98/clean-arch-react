import {
  HttpClient,
  HttpResponse,
  HttpStatusCode,
} from 'shared/application/http-client';
import { MethodNotImplementedError } from 'shared/domain/errors/method-not-implemented.error';

export class EmployeesInMemoryHttpClientAdapter implements HttpClient {
  constructor(public baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<Response>(): Promise<HttpResponse<Response>> {
    throw new MethodNotImplementedError();
  }

  async post<Response>(): Promise<HttpResponse<Response>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: true as Response,
    };
  }

  async put<Response>(): Promise<HttpResponse<Response>> {
    throw new MethodNotImplementedError();
  }

  async delete<Response>(): Promise<HttpResponse<Response>> {
    throw new MethodNotImplementedError();
  }
}
