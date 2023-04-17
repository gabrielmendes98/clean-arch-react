import { EmployeeListItem } from 'employee/domain/entities/employee-list.entity';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { EmployeeListStorage } from 'employee/domain/interfaces/employee-list.interface';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';
import { HttpStatusCode } from 'shared/domain/interfaces/http-client.interface';

export class DeleteEmployeeFromListUseCase
  implements
    UseCase<
      DeleteEmployeeFromListUseCaseInput,
      DeleteEmployeeFromListUseCaseOutput
    >
{
  constructor(
    private employeeApiService: EmployeeRepository,
    private employeeListStorage: EmployeeListStorage,
  ) {}

  async execute(
    input: DeleteEmployeeFromListUseCaseInput,
  ): Promise<DeleteEmployeeFromListUseCaseOutput> {
    const removedIndex = this.employeeListStorage.removeItem(input.item);
    const response = await this.employeeApiService.delete({
      id: input.item.id,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return;
      default:
        this.employeeListStorage.addItem(input.item, removedIndex);
        throw new UnexpectedError();
    }
  }
}

export type DeleteEmployeeFromListUseCaseInput = {
  item: EmployeeListItem;
};

export type DeleteEmployeeFromListUseCaseOutput = void;
