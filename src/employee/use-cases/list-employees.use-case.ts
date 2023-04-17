import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { HttpStatusCode } from 'shared/domain/interfaces/http-client.interface';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';

export class ListEmployeesUseCase
  implements UseCase<ListEmployeesUseCaseInput, ListEmployeesUseCaseOutput>
{
  constructor(private employeeApiService: EmployeeRepository) {}

  async execute(): Promise<ListEmployeesUseCaseOutput> {
    const response = await this.employeeApiService.list();
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return {
          list: new EmployeeList(response.body),
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export type ListEmployeesUseCaseInput = void;

export type ListEmployeesUseCaseOutput = { list: EmployeeList };
