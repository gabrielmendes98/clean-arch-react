import { Employee } from 'employee/domain/entities/employee.entity';
import { UseCase } from 'shared/application/use-case';
import {
  UnexpectedError,
  UNEXPECTED_ERROR_MESSAGE,
} from 'shared/domain/errors/unexpected.error';
import {
  HttpClientService,
  HttpStatusCode,
} from 'shared/application/http-client.port';
import { NotificationService } from '../ports/notification';

export class RegisterEmployeeUseCase implements UseCase<Input, Output> {
  constructor(
    private httpClient: HttpClientService,
    private notifier: NotificationService,
  ) {}

  async execute(input: Input): Promise<Output> {
    Employee.validate(input);
    const response = await this.httpClient.post<Output>('/employees', input);
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
