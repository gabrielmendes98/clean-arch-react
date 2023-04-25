import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { UseCase } from 'shared/use-cases/use-case.interface';

export class RegisterEmployeeUseCase
  implements
    UseCase<RegisterEmployeeUseCaseInput, RegisterEmployeeUseCaseOutput>
{
  constructor(
    private employeeRepository: EmployeeRepository,
    private notifier: NotificationService,
  ) {}

  async execute(
    input: RegisterEmployeeUseCaseInput,
  ): Promise<RegisterEmployeeUseCaseOutput> {
    try {
      const employee = EmployeeFactory.create(input);
      if (!employee.isValid()) {
        this.notifier.notify(employee.messages(), 'error');
        return;
      }
      await this.employeeRepository.create(employee);
      this.notifier.notify('Funcionário cadastrado com sucesso!', 'success');
    } catch (e) {
      const error = e as Error;
      this.notifier.notify(error.message, 'error');
      throw e;
    }
  }
}

export type RegisterEmployeeUseCaseInput = {
  name: string;
  email: string;
  document: string;
  salary: number;
};

export type RegisterEmployeeUseCaseOutput = void;
