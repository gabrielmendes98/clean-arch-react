import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';
import { HttpStatusCode } from 'shared/domain/interfaces/http-client.interface';

export class GetEmployeeUseCase
  implements UseCase<GetEmployeeUseCaseInput, GetEmployeeUseCaseOutput>
{
  constructor(private employeeApiService: EmployeeRepository) {}

  async execute(
    input: GetEmployeeUseCaseInput,
  ): Promise<GetEmployeeUseCaseOutput> {
    UniqueEntityId.validate(input.id);
    const response = await this.employeeApiService.get({ id: input.id });
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return {
          employee: EmployeeFactory.create({
            document: response.body.document,
            email: response.body.email,
            id: response.body.id,
            name: response.body.name,
            salary: response.body.salary,
          }),
        };
      default:
        throw new UnexpectedError();
    }
  }
}

export type GetEmployeeUseCaseInput = {
  id: string;
};

export type GetEmployeeUseCaseOutput = { employee: Employee };
