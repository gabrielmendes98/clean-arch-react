import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { pages } from 'shared/domain/config/pages';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { UseCase } from 'shared/use-cases/use-case.interface';

export class UpdateEmployeeUseCase
  implements UseCase<UpdateEmployeeUseCaseInput, UpdateEmployeeUseCaseOutput>
{
  constructor(
    private employeeRepository: EmployeeRepository,
    private routerService: RouterService,
    private notifier: NotificationService,
  ) {}

  async execute(
    input: UpdateEmployeeUseCaseInput,
  ): Promise<UpdateEmployeeUseCaseOutput> {
    try {
      const employee = EmployeeFactory.create(input);
      if (!employee.isValid()) {
        console.log(employee);
        this.notifier.notify(employee.messages(), 'error');
        return;
      }
      await this.employeeRepository.update(employee);
      this.notifier.notify('Funcionário atualizado com sucesso!', 'success');
      this.routerService.navigate(pages.listEmployees);
    } catch (e) {
      const error = e as Error;
      this.notifier.notify(error.message, 'error');
      throw e;
    }
  }
}

export type UpdateEmployeeUseCaseInput = {
  id: string;
  name: string;
  email: string;
  document: string;
  salary: number;
};

export type UpdateEmployeeUseCaseOutput = void;
