import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeeService } from 'employee/domain/interfaces/employee-service.interface';
import {
  UnexpectedError,
  UNEXPECTED_ERROR_MESSAGE,
} from 'shared/domain/errors/unexpected.error';
import { pages } from 'shared/domain/config/pages';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { HttpStatusCode } from 'shared/domain/interfaces/http-client.interface';

export class UpdateEmployeeUseCase implements UseCase<Input, Output> {
  constructor(
    private employeeApiService: EmployeeService,
    private routerService: RouterService,
    private notifier: NotificationService,
  ) {}

  async execute(input: Input): Promise<Output> {
    Employee.validate(input);
    const response = await this.employeeApiService.updateEmployee(input);
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        this.notifier.notify('Funcionário atualizado com sucesso!', 'success');
        this.routerService.navigate(pages.listEmployees);
        return response.body;
      default:
        this.notifier.notify(UNEXPECTED_ERROR_MESSAGE, 'error');
        throw new UnexpectedError();
    }
  }
}

export type Input = {
  id: string;
  name: string;
  email: string;
  document: string;
  salary: number;
};

export type Output = {
  success: boolean;
};
