import { EmployeeListItem } from 'employee/domain/entities/employee-list.entity';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { UseCase } from 'shared/use-cases/use-case.interface';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';

export class DeleteEmployeeUseCase
  implements UseCase<DeleteEmployeeUseCaseInput, DeleteEmployeeUseCaseOutput>
{
  constructor(
    private employeeRepository: EmployeeRepository,
    private notifier: NotificationService,
  ) {}

  async execute(
    input: DeleteEmployeeUseCaseInput,
  ): Promise<DeleteEmployeeUseCaseOutput> {
    const id = new UniqueEntityId(input.item.id);

    if (!id.isValid()) {
      throw new Error('ID inválido.');
    }
    try {
      await this.employeeRepository.delete(id.value);
    } catch (e) {
      this.notifier.notify('Erro ao deletar funcionário.', 'error');
      throw e;
    }
  }
}

export type DeleteEmployeeUseCaseInput = {
  item: EmployeeListItem;
};

export type DeleteEmployeeUseCaseOutput = void;
