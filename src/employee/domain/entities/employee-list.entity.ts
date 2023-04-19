import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';

export interface EmployeeListItem {
  name: string;
  salary: number;
  id: string;
  document: string;
  email: string;
}

export class EmployeeList {
  private _employees: EmployeeListItem[];

  constructor(employees?: EmployeeListItem[]) {
    this._employees = [];
    if (employees) {
      this._employees = employees;
    }
  }

  get employees() {
    return this._employees;
  }

  addItem(item: EmployeeListItem, index = 0) {
    new UniqueEntityId(item.id).validate();
    this._employees.splice(index, 0, item);
  }

  removeItem(item: EmployeeListItem) {
    const index = this._employees.indexOf(item);
    this._employees.splice(index, 1);
    return index;
  }
}
