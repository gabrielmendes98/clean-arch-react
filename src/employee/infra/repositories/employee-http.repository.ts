import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import {
  HttpClient,
  HttpStatusCode,
} from 'shared/domain/interfaces/http-client.interface';
import {
  GetEmployeeHttpResponseDto,
  ListEmployeesHttpResponseDto,
  RegisterEmployeeHttpRequestDto,
  UpdateEmployeeRequestDto,
} from './dto/employee-http.dto';

export class EmployeeHttpRepository implements EmployeeRepository {
  constructor(private httpClient: HttpClient) {}

  async delete(entity: Employee): Promise<void> {
    const response = await this.httpClient.delete<void>(
      `/employees/${entity.id}`,
    );
    if (response.statusCode !== HttpStatusCode.ok) {
      throw new Error('Não foi possível deletar o funcionário.');
    }
  }

  async get(id: string): Promise<Employee> {
    const response = await this.httpClient.get<GetEmployeeHttpResponseDto>(
      `/employees/${id}`,
    );
    if (response.statusCode !== HttpStatusCode.ok) {
      throw new Error('Funcionário não encontrado.');
    }
    return EmployeeFactory.create({
      id: response.body.id,
      name: response.body.name,
      salary: response.body.salary,
      document: response.body.document,
      email: response.body.email,
    });
  }

  async list(): Promise<EmployeeList> {
    const response = await this.httpClient.get<ListEmployeesHttpResponseDto>(
      '/employees',
    );
    if (response.statusCode !== HttpStatusCode.ok) {
      throw new Error('Funcionários não encontrados.');
    }
    return new EmployeeList(response.body.employees);
  }

  async create(employee: Employee): Promise<void> {
    const response = await this.httpClient.post<
      RegisterEmployeeHttpRequestDto,
      void
    >('/employees', {
      name: employee.name,
      salary: employee.salary,
      document: employee.document,
      email: employee.email,
    });
    if (response.statusCode !== HttpStatusCode.created) {
      throw new Error('Não foi possível criar o funcionário.');
    }
  }

  async update(employee: Employee): Promise<void> {
    if (!employee.id)
      throw new Error(
        'É necessário informar o id do funcionário para atualizar.',
      );
    const response = await this.httpClient.put<UpdateEmployeeRequestDto, void>(
      `/employees/${employee.id}`,
      {
        id: employee.id,
        name: employee.name,
        salary: employee.salary,
        document: employee.document,
        email: employee.email,
      },
    );
    if (response.statusCode !== HttpStatusCode.ok) {
      throw new Error('Não foi possível atualizar o funcionário.');
    }
  }
}
