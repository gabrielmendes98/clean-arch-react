import { Employee } from 'employee/domain/entities/employee.entity';
import { UseCase } from 'shared/application/use-case';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { HttpClient, HttpStatusCode } from 'shared/application/http-client';

export class RegisterEmployeeUseCase implements UseCase<Input, Output> {
  constructor(private httpClient: HttpClient) {}

  async execute(input: Input): Promise<Output> {
    Employee.validate(input);
    const response = await this.httpClient.post<boolean>('/employees', input);
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return true;
      default:
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

export type Output = boolean;
