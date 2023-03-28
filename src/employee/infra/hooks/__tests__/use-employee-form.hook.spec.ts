import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { renderHook } from 'shared/testing/test-utils';
import { useEmployeeForm } from '../use-employee-form.hook';

describe('useEmployeeForm', () => {
  test('initialValues', () => {
    const { result } = renderHook(() => useEmployeeForm());
    expect(result.current.initialValues).toStrictEqual({
      name: '',
      email: '',
      document: '',
      salary: '',
    });
  });

  test('parseValuesToInput', () => {
    const { result } = renderHook(() => useEmployeeForm());
    const parsed = result.current.parseValuesToInput({
      document: '12312312312',
      email: 'some@email.com',
      name: 'some name',
      salary: '123',
    });
    expect(parsed).toStrictEqual({
      document: '12312312312',
      email: 'some@email.com',
      name: 'some name',
      salary: 123,
    });
  });

  test('parseEntityToValues', () => {
    const { result } = renderHook(() => useEmployeeForm());

    const parsed = result.current.parseEntityToValues(
      EmployeeFactory.create({
        id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
        document: '03542157015',
        email: 'some@email.com',
        name: 'some name',
        salary: 123123,
      }),
    );
    expect(parsed).toStrictEqual({
      document: '03542157015',
      email: 'some@email.com',
      name: 'some name',
      salary: '123123',
    });
  });
});
