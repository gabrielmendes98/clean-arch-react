import {
  DeleteEmployeeRequestDto,
  DeleteEmployeeResponseDto,
} from 'employee/domain/dto/delete-employee.dto';
import {
  GetEmployeeRequestDto,
  GetEmployeeResponseDto,
} from 'employee/domain/dto/get-employee.dto';
import { ListEmployeesResponseDto } from 'employee/domain/dto/list-employees.dto';
import {
  RegisterEmployeeRequestDto,
  RegisterEmployeeResponseDto,
} from 'employee/domain/dto/register-employee.dto';
import {
  UpdateEmployeeRequestDto,
  UpdateEmployeeResponseDto,
} from 'employee/domain/dto/update-employee.dto';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import {
  HttpClient,
  HttpResponse,
} from 'shared/domain/interfaces/http-client.interface';

export class EmployeeHttpRepository implements EmployeeRepository {
  constructor(private httpClient: HttpClient) {}

  async delete(
    data: DeleteEmployeeRequestDto,
  ): Promise<HttpResponse<DeleteEmployeeResponseDto>> {
    return await this.httpClient.delete<DeleteEmployeeResponseDto>(
      `/employees/${data.id}`,
    );
  }

  async get(
    data: GetEmployeeRequestDto,
  ): Promise<HttpResponse<GetEmployeeResponseDto>> {
    return await this.httpClient.get<GetEmployeeResponseDto>(
      `/employees/${data.id}`,
    );
  }

  async list(): Promise<HttpResponse<ListEmployeesResponseDto>> {
    return await this.httpClient.get<ListEmployeesResponseDto>('/employees');
  }

  async create(
    employee: RegisterEmployeeRequestDto,
  ): Promise<HttpResponse<RegisterEmployeeResponseDto>> {
    return await this.httpClient.post<RegisterEmployeeResponseDto>(
      '/employees',
      employee,
    );
  }

  async update(
    employee: UpdateEmployeeRequestDto,
  ): Promise<HttpResponse<UpdateEmployeeResponseDto>> {
    return await this.httpClient.put<UpdateEmployeeResponseDto>(
      `/employees/${employee.id}`,
      employee,
    );
  }
}
