import { HttpResponse } from 'shared/application/http-client.port';
import { DeleteEmployeeResponseDto } from '../dto/delete-employee.dto';
import { GetEmployeeResponseDto } from '../dto/get-employee.dto';
import { ListEmployeesResponseDto } from '../dto/list-employees.dto';
import {
  RegisterEmployeeRequestDto,
  RegisterEmployeeResponseDto,
} from '../dto/register-employee.dto';
import {
  UpdateEmployeeRequestDto,
  UpdateEmployeeResponseDto,
} from '../dto/update-employee.dto';

export interface EmployeeService {
  deleteEmployee(id: string): Promise<HttpResponse<DeleteEmployeeResponseDto>>;
  getEmployee(id: string): Promise<HttpResponse<GetEmployeeResponseDto>>;
  listEmployees(): Promise<HttpResponse<ListEmployeesResponseDto>>;
  createEmployee(
    employee: RegisterEmployeeRequestDto,
  ): Promise<HttpResponse<RegisterEmployeeResponseDto>>;
  updateEmployee(
    employee: UpdateEmployeeRequestDto,
  ): Promise<HttpResponse<UpdateEmployeeResponseDto>>;
}
