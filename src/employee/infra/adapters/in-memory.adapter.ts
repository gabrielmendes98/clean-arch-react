import {
  HttpClientService as HttpClientService,
  HttpResponse,
  HttpStatusCode,
} from 'shared/application/http-client.port';
import { MethodNotImplementedError } from 'shared/domain/errors/method-not-implemented.error';

const getRouteType = (route: string): 'getByIdRoute' | 'listRoute' => {
  const routes = {
    getByIdRoute: /\/employees\/(.+)/i,
    listRoute: /^\/employees$/,
  };
  const isListRoute = routes.listRoute.test(route);
  return isListRoute ? 'listRoute' : 'getByIdRoute';
};

export class EmployeesInMemoryHttpClient implements HttpClientService {
  constructor(public baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<Response>(url: string): Promise<HttpResponse<Response>> {
    const route = getRouteType(url);
    let response;

    if (route === 'listRoute') {
      response = [
        {
          email: 'gabriel@gmail.com',
          id: 'bb30888c-06cf-458b-aced-8a75187c6a67',
          name: 'Gabriel Santiago',
          salary: 25000,
          document: '98536970090',
        },
        {
          email: 'joaodasilva@gmail.com',
          id: '11cbc2c2-32c2-42c5-ba5e-c21ca92a3047',
          name: 'João da Silva',
          salary: 20000,
          document: '75986850025',
        },
      ];
    } else {
      response = {
        email: 'gabriel@gmail.com',
        id: 'bb30888c-06cf-458b-aced-8a75187c6a67',
        name: 'Gabriel Santiago',
        salary: 25000,
        document: '98536970090',
      };
    }

    return {
      statusCode: HttpStatusCode.ok,
      body: response as Response,
    };
  }

  async post<Response>(): Promise<HttpResponse<Response>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
      } as Response,
    };
  }

  async put<Response>(): Promise<HttpResponse<Response>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
      } as Response,
    };
  }

  async delete<Response>(): Promise<HttpResponse<Response>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
      } as Response,
    };

    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve({
    //       statusCode: HttpStatusCode.badRequest,
    //       body: {
    //         success: true,
    //       } as Response,
    //     });
    //   }, 1000);
    // });
  }
}
