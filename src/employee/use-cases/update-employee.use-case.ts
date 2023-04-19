import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { pages } from 'shared/domain/config/pages';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { RouterService } from 'shared/domain/interfaces/router.interface';

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
      await this.employeeRepository.update(EmployeeFactory.create(input));
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
