import { EmployeeListItem } from 'employee/domain/entities/employee-list.entity';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { EmployeeListStorage } from 'employee/domain/interfaces/employee-list.interface';
import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';

export class DeleteEmployeeFromListUseCase
  implements
    UseCase<
      DeleteEmployeeFromListUseCaseInput,
      DeleteEmployeeFromListUseCaseOutput
    >
{
  constructor(
    private employeeRepository: EmployeeRepository,
    private employeeListStorage: EmployeeListStorage,
  ) {}

  async execute(
    input: DeleteEmployeeFromListUseCaseInput,
  ): Promise<DeleteEmployeeFromListUseCaseOutput> {
    const removedIndex = this.employeeListStorage.removeItem(input.item);
    try {
      await this.employeeRepository.delete(
        EmployeeFactory.create({
          id: input.item.id,
          name: input.item.name,
          salary: input.item.salary,
          document: input.item.document,
          email: input.item.email,
        }),
      );
    } catch (e) {
      this.employeeListStorage.addItem(input.item, removedIndex);
      throw e;
    }
  }
}

export type DeleteEmployeeFromListUseCaseInput = {
  item: EmployeeListItem;
};

export type DeleteEmployeeFromListUseCaseOutput = void;
