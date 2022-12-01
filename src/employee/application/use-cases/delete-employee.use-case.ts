import { UseCase } from 'shared/application/use-case';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { HttpClient, HttpStatusCode } from 'shared/application/http-client';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';

export class DeleteEmployeeUseCase implements UseCase<Input, Output> {
  constructor(private httpClient: HttpClient) {}

  async execute(input: Input): Promise<Output> {
    const id = input.id;
    UniqueEntityId.validate(id);
    const response = await this.httpClient.delete<Output>(`/employees/${id}`);
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
};

export type Output = {
  success: boolean;
};
