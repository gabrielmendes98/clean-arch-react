import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import {
  UnexpectedError,
  UNEXPECTED_ERROR_MESSAGE,
} from 'shared/domain/errors/unexpected.error';
import { HttpStatusCode } from 'shared/domain/interfaces/http-client.interface';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';

export class RegisterEmployeeUseCase implements UseCase<Input, Output> {
  constructor(
    private employeeApiService: EmployeeRepository,
    private notifier: NotificationService,
  ) {}

  async execute(input: Input): Promise<Output> {
    Employee.validate(input);
    const response = await this.employeeApiService.create(input);
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
