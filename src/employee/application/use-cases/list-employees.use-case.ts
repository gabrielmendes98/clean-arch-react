import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { UseCase } from 'shared/application/use-case.port';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { HttpStatusCode } from 'shared/application/http-client.port';
import { EmployeeGateway } from '../ports/employee-gateway.port';

export class ListEmployeesUseCase implements UseCase<Input, Output> {
  constructor(private employeeApiService: EmployeeGateway) {}

  async execute(): Promise<Output> {
    const response = await this.employeeApiService.listEmployees();
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return new EmployeeList(response.body);
      default:
        throw new UnexpectedError();
    }
  }
}

export type Input = void;

export type Output = EmployeeList;
