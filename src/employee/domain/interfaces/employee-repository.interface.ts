import { HttpResponse } from 'shared/domain/interfaces/http-client.interface';
import {
  DeleteEmployeeRequestDto,
  DeleteEmployeeResponseDto,
} from '../dto/delete-employee.dto';
import {
  GetEmployeeRequestDto,
  GetEmployeeResponseDto,
} from '../dto/get-employee.dto';
import {
  ListEmployeesRequestDto,
  ListEmployeesResponseDto,
} from '../dto/list-employees.dto';
import {
  RegisterEmployeeRequestDto,
  RegisterEmployeeResponseDto,
} from '../dto/register-employee.dto';
import {
  UpdateEmployeeRequestDto,
  UpdateEmployeeResponseDto,
} from '../dto/update-employee.dto';

export interface EmployeeRepository {
  delete(
    data: DeleteEmployeeRequestDto,
  ): Promise<HttpResponse<DeleteEmployeeResponseDto>>;
  get(
    data: GetEmployeeRequestDto,
  ): Promise<HttpResponse<GetEmployeeResponseDto>>;
  list(
    data: ListEmployeesRequestDto,
  ): Promise<HttpResponse<ListEmployeesResponseDto>>;
  create(
    employee: RegisterEmployeeRequestDto,
  ): Promise<HttpResponse<RegisterEmployeeResponseDto>>;
  update(
    employee: UpdateEmployeeRequestDto,
  ): Promise<HttpResponse<UpdateEmployeeResponseDto>>;
}
