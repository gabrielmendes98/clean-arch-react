import { GetEmployeeDto } from 'employee/application/dto/get-employee.dto';
import { ListEmployeesDto } from 'employee/application/dto/list-employees.dto';
import {
  HttpClientService as HttpClientService,
  HttpResponse,
  HttpStatusCode,
} from 'shared/application/http-client.port';

const listEmployeesResponse: ListEmployeesDto = [
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

const getEmployeeResponse: GetEmployeeDto = {
  email: 'gabriel@gmail.com',
  id: 'bb30888c-06cf-458b-aced-8a75187c6a67',
  name: 'Gabriel Santiago',
  salary: 25000,
  document: '98536970090',
};

export class EmployeesInMemoryHttpClient implements HttpClientService {
  constructor(public baseUrl?: string) {
    this.baseUrl = baseUrl;
  }

  async get(url: string): Promise<HttpResponse> {
    let response: GetEmployeeDto | ListEmployeesDto;
    if (url === '/employees') {
      response = listEmployeesResponse;
    } else {
      response = getEmployeeResponse;
    }
    return {
      statusCode: HttpStatusCode.ok,
      body: response,
    };
  }

  async post(): Promise<HttpResponse> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
      },
    };
  }

  async put(): Promise<HttpResponse> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
      },
    };
  }

  async delete(): Promise<HttpResponse> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
      },
    };
  }
}
