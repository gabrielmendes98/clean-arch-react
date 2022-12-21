import { DeleteEmployeeResponseDto } from 'employee/application/dto/delete-employee.dto';
import { GetEmployeeResponseDto } from 'employee/application/dto/get-employee.dto';
import { ListEmployeesResponseDto } from 'employee/application/dto/list-employees.dto';
import { RegisterEmployeeResponseDto } from 'employee/application/dto/register-employee.dto';
import { UpdateEmployeeResponseDto } from 'employee/application/dto/update-employee.dto';
import { EmployeeGateway } from 'employee/application/ports/employee-gateway.port';
import {
  HttpResponse,
  HttpStatusCode,
} from 'shared/application/http-client.port';

export class EmployeeMemoryGateway implements EmployeeGateway {
  async deleteEmployee(): Promise<HttpResponse<DeleteEmployeeResponseDto>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
      },
    };
  }

  async getEmployee(): Promise<HttpResponse<GetEmployeeResponseDto>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        email: 'gabriel@gmail.com',
        id: 'bb30888c-06cf-458b-aced-8a75187c6a67',
        name: 'Gabriel Santiago',
        salary: 25000,
        document: '98536970090',
      },
    };
  }

  async listEmployees(): Promise<HttpResponse<ListEmployeesResponseDto>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: [
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
      ],
    };
  }

  async createEmployee(): Promise<HttpResponse<RegisterEmployeeResponseDto>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
      },
    };
  }

  async updateEmployee(): Promise<HttpResponse<UpdateEmployeeResponseDto>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        success: true,
      },
    };
  }
}
