import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import {
  UnexpectedError,
  UNEXPECTED_ERROR_MESSAGE,
} from 'shared/domain/errors/unexpected.error';
import { HttpStatusCode } from 'shared/domain/interfaces/http-client.interface';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';

export class RegisterEmployeeUseCase
  implements
    UseCase<RegisterEmployeeUseCaseInput, RegisterEmployeeUseCaseOutput>
{
  constructor(
    private employeeApiService: EmployeeRepository,
    private notifier: NotificationService,
  ) {}

  async execute(
    input: RegisterEmployeeUseCaseInput,
  ): Promise<RegisterEmployeeUseCaseOutput> {
    Employee.validate(input);
    const response = await this.employeeApiService.create(input);
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        this.notifier.notify('Funcionário cadastrado com sucesso!', 'success');
        return {
          id: response.body.id,
          name: response.body.name,
          email: response.body.email,
          document: response.body.document,
          salary: response.body.salary,
        };
      default:
        this.notifier.notify(UNEXPECTED_ERROR_MESSAGE, 'error');
        throw new UnexpectedError();
    }
  }
}

export type RegisterEmployeeUseCaseInput = {
  name: string;
  email: string;
  document: string;
  salary: number;
};

export type RegisterEmployeeUseCaseOutput = {
  id: string;
  name: string;
  email: string;
  document: string;
  salary: number;
};
