import {
  EmployeeList,
  EmployeeListItem,
} from 'employee/domain/entities/employee-list.entity';
import { EmployeeService } from 'employee/domain/interfaces/employee-service.interface';
import { EmployeeListService } from 'employee/domain/interfaces/employee-list.interface';
import { UseCase } from 'shared/application/use-case.port';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { HttpStatusCode } from 'shared/application/http-client.port';

export class DeleteEmployeeFromListUseCase implements UseCase<Input, Output> {
  constructor(
    private employeeApiService: EmployeeService,
    private employeeListService: EmployeeListService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const { list, updateList } = this.employeeListService;
    const { item } = input;

    const removedIndex = list.removeItem(item);
    updateList(new EmployeeList(list.items));

    const response = await this.employeeApiService.deleteEmployee(item.id);

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
