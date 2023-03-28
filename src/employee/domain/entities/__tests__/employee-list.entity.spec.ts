import { EmployeeList } from '../employee-list.entity';

const fakeEmployee = {
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  document: '03542157015',
  email: 'some@email.com',
  name: 'some name',
  salary: 123123,
};

const otherFakeEmployee = {
  id: '654ad5fc-bd1a-41c6-b6ac-297058f7a2a7',
  document: '39517705034',
  email: 'fake@email.com',
  name: 'fake name',
  salary: 123456,
};

describe('EmployeeList', () => {
  it('should start with empty array', () => {
    const list = new EmployeeList();
    expect(list.employees).toStrictEqual([]);
  });

  it('should set initial items', () => {
    const list = new EmployeeList([fakeEmployee]);
    expect(list.employees).toStrictEqual([fakeEmployee]);
  });

  it('should be able to add item on list head by default', () => {
    const list = new EmployeeList([fakeEmployee]);
    list.addItem(otherFakeEmployee);
    expect(list.employees).toStrictEqual([otherFakeEmployee, fakeEmployee]);
  });

  it('should be able to add item on index', () => {
    const list = new EmployeeList([fakeEmployee]);
    list.addItem(otherFakeEmployee, 1);
    expect(list.employees).toStrictEqual([fakeEmployee, otherFakeEmployee]);
  });

  it('should be able to remove item', () => {
    const list = new EmployeeList([fakeEmployee]);
    list.removeItem(fakeEmployee);
    expect(list.employees).toStrictEqual([]);
  });
});
