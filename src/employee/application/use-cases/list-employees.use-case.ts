import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { UseCase } from 'shared/application/use-case';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import {
  HttpClientService,
  HttpStatusCode,
} from 'shared/application/http-client.port';
import { ListEmployeesResponseDto } from '../dto/list-employees-response.dto';

export class ListEmployeesUseCase implements UseCase<Input, Output> {
  constructor(private httpClient: HttpClientService) {}

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
