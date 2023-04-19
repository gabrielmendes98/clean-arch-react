import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';

export class GetEmployeeUseCase
  implements UseCase<GetEmployeeUseCaseInput, GetEmployeeUseCaseOutput>
{
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(
    input: GetEmployeeUseCaseInput,
  ): Promise<GetEmployeeUseCaseOutput> {
    new UniqueEntityId(input.id).validate();
    const employee = await this.employeeRepository.get(input.id);
    return employee;
  }
}

export type GetEmployeeUseCaseInput = {
  id: string;
};

export type GetEmployeeUseCaseOutput = Employee;
