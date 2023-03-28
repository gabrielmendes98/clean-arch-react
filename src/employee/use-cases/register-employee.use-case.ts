import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeeService } from 'employee/domain/interfaces/employee-service.interface';
import { UseCase } from 'shared/application/use-case.port';
import {
  UnexpectedError,
  UNEXPECTED_ERROR_MESSAGE,
} from 'shared/domain/errors/unexpected.error';
import { HttpStatusCode } from 'shared/application/http-client.port';
import { NotificationService } from 'shared/application/notification.port';

export class RegisterEmployeeUseCase implements UseCase<Input, Output> {
  constructor(
    private employeeApiService: EmployeeService,
    private notifier: NotificationService,
  ) {}

  async execute(input: Input): Promise<Output> {
    Employee.validate(input);
    const response = await this.employeeApiService.createEmployee(input);
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        this.notifier.notify('Funcionário cadastrado com sucesso!', 'success');
        return response.body;
      default:
        this.notifier.notify(UNEXPECTED_ERROR_MESSAGE, 'error');
        throw new UnexpectedError();
    }
  }
}

export type Input = {
  name: string;
  email: string;
  document: string;
  salary: number;
};

export type Output = {
  success: boolean;
};
