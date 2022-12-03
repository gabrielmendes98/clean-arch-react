import {
  EmployeeList,
  EmployeeListItem,
} from 'employee/domain/entities/employee-list.entity';
import { UseCase } from 'shared/application/use-case';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import {
  HttpClientService,
  HttpStatusCode,
} from 'shared/application/http-client.port';
import { EmployeeListService } from '../ports/employee-list.port';

export class DeleteEmployeeFromListUseCase implements UseCase<Input, Output> {
  constructor(
    private httpClient: HttpClientService,
    private employeeListService: EmployeeListService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const { list, updateList } = this.employeeListService;
    const { item } = input;

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
  item: EmployeeListItem;
};

export type Output = {
  success: boolean;
};
