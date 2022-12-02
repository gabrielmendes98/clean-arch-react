export interface EmployeeListItem {
  name: string;
  salary: number;
  id: string;
  document: string;
  email: string;
}

export type EmployeeListProps = {
  items: EmployeeListItem[];
};

export class EmployeeList {
  items: EmployeeListItem[];

  constructor(items?: EmployeeListItem[]) {
    this.items = [];
    if (items) {
      this.items = items;
    }
  }

  addItem(item: EmployeeListItem, index = 0) {
    this.items.splice(index, 0, item);
  }

  removeItem(item: EmployeeListItem) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    return index;
  }
}
