import {
  EmployeeList,
  EmployeeListItem,
} from 'employee/domain/entities/employee-list.entity';
import { UseCase } from 'shared/application/use-case';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { HttpClient, HttpStatusCode } from 'shared/application/http-client';

export class DeleteEmployeeFromListUseCase implements UseCase<Input, Output> {
  constructor(private httpClient: HttpClient) {}

  async execute(input: Input): Promise<Output> {
    const { list, item, updateList } = input;

    const removedIndex = list.removeItem(item);
    updateList(new EmployeeList(list.items));

    const response = await this.httpClient.delete<Output>(
      `/employees/${item.id}`,
    );
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      default:
        list.addItem(item, removedIndex);
        updateList(new EmployeeList(list.items));
        throw new UnexpectedError();
    }
  }
}

export type Input = {
  list: EmployeeList;
  item: EmployeeListItem;
  updateList: (list: EmployeeList) => void;
};

export type Output = {
  success: boolean;
};