import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { NotificationError } from 'shared/domain/notification/notification.error';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { UseCase } from 'shared/use-cases/use-case.interface';

export class GetEmployeeUseCase
  implements UseCase<GetEmployeeUseCaseInput, GetEmployeeUseCaseOutput>
{
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(
    input: GetEmployeeUseCaseInput,
  ): Promise<GetEmployeeUseCaseOutput> {
    const id = new UniqueEntityId(input.id);
    if (!id.isValid()) {
      throw new NotificationError(id.notification.errors);
    }
    const employee = await this.employeeRepository.get(id.value);
    return employee;
  }
}

export type GetEmployeeUseCaseInput = {
  id: string;
};

export type GetEmployeeUseCaseOutput = Employee;
