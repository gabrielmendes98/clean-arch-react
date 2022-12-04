import { Employee } from 'employee/domain/entities/employee.entity';
import { UseCase } from 'shared/application/use-case';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import {
  HttpClientService,
  HttpStatusCode,
} from 'shared/application/http-client.port';

export class UpdateEmployeeUseCase implements UseCase<Input, Output> {
  constructor(private httpClient: HttpClientService) {}

  async execute(input: Input): Promise<Output> {
    Employee.validate(input);
    const response = await this.httpClient.put<Output>(
      `/employees/${input.id}`,
      input,
    );
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      default:
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
