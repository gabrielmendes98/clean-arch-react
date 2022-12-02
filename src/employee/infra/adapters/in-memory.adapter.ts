import { ListEmployeesResponseDto } from 'employee/application/dto/list-employees-response.dto';
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
    console.log('searching employees');
    const employees: ListEmployeesResponseDto = [
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
    return {
      statusCode: HttpStatusCode.ok,
      body: employees as Response,
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
    throw new MethodNotImplementedError();
  }

  async delete<Response>(endpoint: string): Promise<HttpResponse<Response>> {
    console.log('deleting employee', endpoint);
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
      } as Response,
    };
  }
}
