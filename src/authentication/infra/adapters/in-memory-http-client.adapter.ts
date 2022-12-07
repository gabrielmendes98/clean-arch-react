import {
  HttpClientService as HttpClientService,
  HttpResponse,
  HttpStatusCode,
} from 'shared/application/http-client.port';
import { MethodNotImplementedError } from 'shared/domain/errors/method-not-implemented.error';

export class AuthenticationInMemoryHttpClient implements HttpClientService {
  constructor(public baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<Response>(): Promise<HttpResponse<Response>> {
    throw new MethodNotImplementedError();
  }

  async post<Response>(): Promise<HttpResponse<Response>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
        email: 'fakeemail@gmail.com',
        id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
      } as Response,
    };
  }

  async put<Response>(): Promise<HttpResponse<Response>> {
    throw new MethodNotImplementedError();
  }

  async delete<Response>(): Promise<HttpResponse<Response>> {
    throw new MethodNotImplementedError();
  }
}
