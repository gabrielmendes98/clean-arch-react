import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeeApiService } from 'employee/domain/interfaces/employee-service.interface';
import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';
import { HttpStatusCode } from 'shared/domain/interfaces/http-client.interface';

export class GetEmployeeUseCase implements UseCase<Input, Output> {
  constructor(private employeeApiService: EmployeeApiService) {}

  async execute(input: Input): Promise<Output> {
    UniqueEntityId.validate(input.id);
    const response = await this.employeeApiService.getEmployee(input.id);
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

export type Input = {
  id: string;
};

export type Output = { employee: Employee };
