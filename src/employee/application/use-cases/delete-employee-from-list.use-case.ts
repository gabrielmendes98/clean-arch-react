import {
  EmployeeList as EmployeeListEntity,
  EmployeeListItem,
} from 'employee/domain/entities/employee-list.entity';
import { UseCase } from 'shared/application/use-case';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { HttpClient, HttpStatusCode } from 'shared/application/http-client';
import { EmployeeList as EmployeeListPort } from '../ports/employee-list.port';

export class DeleteEmployeeFromListUseCase implements UseCase<Input, Output> {
  constructor(
    private httpClient: HttpClient,
    private employeeListStorage: EmployeeListPort,
  ) {}

  async execute(input: Input): Promise<Output> {
    const { list, updateList } = this.employeeListStorage;
    const { item } = input;

    const removedIndex = list.removeItem(item);
    updateList(new EmployeeListEntity(list.items));

    const response = await this.httpClient.delete<Output>(
      `/employees/${item.id}`,
    );
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      default:
        list.addItem(item, removedIndex);
        updateList(new EmployeeListEntity(list.items));
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
