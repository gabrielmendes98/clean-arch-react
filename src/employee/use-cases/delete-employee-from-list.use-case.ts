import { EmployeeListItem } from 'employee/domain/entities/employee-list.entity';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { EmployeeListStorage } from 'employee/domain/interfaces/employee-list.interface';
import { UseCase } from 'shared/use-cases/use-case.interface';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';

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
    const id = new UniqueEntityId(input.item.id);

    if (!id.isValid()) {
      throw new Error('ID inválido.');
    }

    const removedIndex = this.employeeListStorage.removeItem(input.item);
    try {
      await this.employeeRepository.delete(id.value);
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
