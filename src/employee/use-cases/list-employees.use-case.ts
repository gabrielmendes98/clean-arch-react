import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { UseCase } from 'shared/use-cases/use-case.interface';

export class ListEmployeesUseCase
  implements UseCase<ListEmployeesUseCaseInput, ListEmployeesUseCaseOutput>
{
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(): Promise<ListEmployeesUseCaseOutput> {
    const employeeList = await this.employeeRepository.list();
    return {
      list: employeeList,
    };
  }
}

export type ListEmployeesUseCaseInput = void;

export type ListEmployeesUseCaseOutput = { list: EmployeeList };
