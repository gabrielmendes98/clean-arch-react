import { DeleteEmployeeResponseDto } from 'employee/domain/dto/delete-employee.dto';
import { GetEmployeeResponseDto } from 'employee/domain/dto/get-employee.dto';
import { ListEmployeesResponseDto } from 'employee/domain/dto/list-employees.dto';
import {
  RegisterEmployeeRequestDto,
  RegisterEmployeeResponseDto,
} from 'employee/domain/dto/register-employee.dto';
import {
  UpdateEmployeeRequestDto,
  UpdateEmployeeResponseDto,
} from 'employee/domain/dto/update-employee.dto';
import { EmployeeApiService } from 'employee/domain/interfaces/employee-service.interface';
import {
  HttpClientService,
  HttpResponse,
} from 'shared/application/http-client.port';

export class EmployeeHttpService implements EmployeeApiService {
  constructor(private httpClient: HttpClientService) {}

  async deleteEmployee(
    id: string,
  ): Promise<HttpResponse<DeleteEmployeeResponseDto>> {
    return await this.httpClient.delete<DeleteEmployeeResponseDto>(
      `/employees/${id}`,
    );
  }

  async getEmployee(id: string): Promise<HttpResponse<GetEmployeeResponseDto>> {
    return await this.httpClient.get<GetEmployeeResponseDto>(
      `/employees/${id}`,
    );
  }

  async listEmployees(): Promise<HttpResponse<ListEmployeesResponseDto>> {
    return await this.httpClient.get<ListEmployeesResponseDto>('/employees');
  }

  async createEmployee(
    employee: RegisterEmployeeRequestDto,
  ): Promise<HttpResponse<RegisterEmployeeResponseDto>> {
    return await this.httpClient.post<RegisterEmployeeResponseDto>(
      '/employees',
      employee,
    );
  }

  async updateEmployee(
    employee: UpdateEmployeeRequestDto,
  ): Promise<HttpResponse<UpdateEmployeeResponseDto>> {
    return await this.httpClient.put<UpdateEmployeeResponseDto>(
      `/employees/${employee.id}`,
      employee,
    );
  }
}
