import { Employee } from 'employee/domain/entities/employee.entity';
import { EmployeeService } from 'employee/domain/interfaces/employee-service.interface';
import { UseCase } from 'shared/application/use-case.port';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { HttpStatusCode } from 'shared/application/http-client.port';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { Document } from 'shared/domain/value-objects/document.vo';
import { Email } from 'shared/domain/value-objects/email.vo';

export class GetEmployeeUseCase implements UseCase<Input, Output> {
  constructor(private employeeApiService: EmployeeService) {}

  async execute(input: Input): Promise<Output> {
    UniqueEntityId.validate(input.id);
    const response = await this.employeeApiService.getEmployee(input.id);
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return {
          employee: new Employee({
            document: new Document(response.body.document),
            email: new Email(response.body.email),
            id: new UniqueEntityId(response.body.id),
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
