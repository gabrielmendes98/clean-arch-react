import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { UseCase } from 'shared/application/use-case';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { HttpClient, HttpStatusCode } from 'shared/application/http-client';
import { ListEmployeesResponseDto } from '../dto/list-employees-response.dto';

export class ListEmployeesUseCase implements UseCase<Input, Output> {
  constructor(private httpClient: HttpClient) {}

  async execute(): Promise<Output> {
    const response = await this.httpClient.get<ListEmployeesResponseDto>(
      '/employees',
    );
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return new EmployeeList(response.body);
      default:
        throw new UnexpectedError();
    }
  }
}

export type Input = undefined;

export type Output = EmployeeList;
