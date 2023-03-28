import { EmployeeListItem } from 'employee/domain/entities/employee-list.entity';
import { EmployeeRepository } from 'employee/domain/interfaces/employee-repository.interface';
import { EmployeeListStorage } from 'employee/domain/interfaces/employee-list.interface';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { UseCase } from 'shared/domain/interfaces/use-case.interface';
import { HttpStatusCode } from 'shared/domain/interfaces/http-client.interface';

export class DeleteEmployeeFromListUseCase implements UseCase<Input, Output> {
  constructor(
    private employeeApiService: EmployeeRepository,
    private employeeListStorage: EmployeeListStorage,
  ) {}

  async execute(input: Input): Promise<Output> {
    const removedIndex = this.employeeListStorage.list.removeItem(input.item);
    this.employeeListStorage.updateList(this.employeeListStorage.list);

    const response = await this.employeeApiService.delete(input.item.id);

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      default:
        this.employeeListStorage.list.addItem(input.item, removedIndex);
        this.employeeListStorage.updateList(this.employeeListStorage.list);
        throw new UnexpectedError();
    }
  }
}

export type Input = {
  item: EmployeeListItem;
};

export type Output = {
  success: boolean;
};
