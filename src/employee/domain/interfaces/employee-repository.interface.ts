import { HttpResponse } from 'shared/domain/interfaces/http-client.interface';
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

export interface EmployeeRepository {
  delete(id: string): Promise<HttpResponse<DeleteEmployeeResponseDto>>;
  get(id: string): Promise<HttpResponse<GetEmployeeResponseDto>>;
  list(): Promise<HttpResponse<ListEmployeesResponseDto>>;
  create(
    employee: RegisterEmployeeRequestDto,
  ): Promise<HttpResponse<RegisterEmployeeResponseDto>>;
  update(
    employee: UpdateEmployeeRequestDto,
  ): Promise<HttpResponse<UpdateEmployeeResponseDto>>;
}
