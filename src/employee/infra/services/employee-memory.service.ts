import { DeleteEmployeeResponseDto } from 'employee/domain/dto/delete-employee.dto';
import { GetEmployeeResponseDto } from 'employee/domain/dto/get-employee.dto';
import { ListEmployeesResponseDto } from 'employee/domain/dto/list-employees.dto';
import { RegisterEmployeeResponseDto } from 'employee/domain/dto/register-employee.dto';
import { UpdateEmployeeResponseDto } from 'employee/domain/dto/update-employee.dto';
import { EmployeeService } from 'employee/domain/interfaces/employee-service.interface';
import {
  HttpResponse,
  HttpStatusCode,
} from 'shared/application/http-client.port';

export class EmployeeMemoryService implements EmployeeService {
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
