import { UseCase } from 'shared/application/use-case';
import { UnexpectedError } from 'shared/domain/errors/unexpected-error';
import {
  HttpClient,
  HttpStatusCode,
} from 'shared/domain/interfaces/http-client';

export class RegisterEmployeeUseCase implements UseCase<Input, Output> {
  constructor(private httpClient: HttpClient<Output>) {}

  async execute(input: Input): Promise<Output> {
    const response = await this.httpClient.request({
      url: '/employees',
      method: 'post',
      body: input,
    });
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
