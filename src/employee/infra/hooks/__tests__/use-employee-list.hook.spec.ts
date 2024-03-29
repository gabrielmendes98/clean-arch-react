import { EmployeeList } from 'employee/domain/entities/employee-list.entity';
import { act, renderHook } from 'shared/testing/test-utils';
import { useEmployeeListStorage } from '../use-employee-list.hook';

describe('useEmployeeListStorage', () => {
  it('should return employee list entity', () => {
    const { result } = renderHook(() => useEmployeeListStorage());
    expect(result.current.list).toBeInstanceOf(EmployeeList);
  });

  it('should be able to update entity', () => {
    const { result } = renderHook(() => useEmployeeListStorage());
    act(() => {
      result.current.updateList(
        new EmployeeList([
          {
            id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
            document: '03542157015',
            email: 'some@email.com',
            name: 'some name',
            salary: 123123,
          },
        ]),
      );
    });
    expect(result.current.list.employees).toStrictEqual([
      {
        id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
        document: '03542157015',
        email: 'some@email.com',
        name: 'some name',
        salary: 123123,
      },
    ]);
  });
});
