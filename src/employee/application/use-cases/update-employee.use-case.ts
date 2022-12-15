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
import { RouterService } from 'shared/application/router.port';
import { pages } from 'shared/domain/config/pages';
import { NotificationService } from '../../../shared/application/notification.port';

export class UpdateEmployeeUseCase implements UseCase<Input, Output> {
  constructor(
    private httpClient: HttpClientService,
    private routerService: RouterService,
    private notifier: NotificationService,
  ) {}

  async execute(input: Input): Promise<Output> {
    Employee.validate(input);
    const response = await this.httpClient.put<Output>(
      `/employees/${input.id}`,
      input,
    );

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
