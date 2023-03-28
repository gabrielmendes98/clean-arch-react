import { render, screen, userEvent } from 'shared/testing/test-utils';
import { EmployeesList } from '../employees-list.component';

const renderList = ({
  deleteEmployee = jest.fn(),
  editEmployee = jest.fn(),
} = {}) =>
  render(
    <EmployeesList
      deleteEmployee={deleteEmployee}
      editEmployee={editEmployee}
      employees={[
        {
          id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
          document: '03542157015',
          email: 'some@email.com',
          name: 'some name',
          salary: 123123,
        },
      ]}
    />,
  );

describe('EmployeesList', () => {
  it('should render table correctly', () => {
    renderList();
    expect(
      screen.getByRole('columnheader', { name: /nome/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /salário/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /documento/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /e-mail/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('cell', { name: /some name/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('cell', { name: /some@email.com/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('cell', { name: /03542157015/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /123123/i })).toBeInTheDocument();
  });

  it('should call deleteEmployee when click on delete button', () => {
    const deleteEmployee = jest.fn();
    renderList({ deleteEmployee });
    userEvent.click(screen.getByRole('button', { name: /deletar/i }));
    expect(deleteEmployee).toHaveBeenCalled();
  });

  it('should call editEmployee when click on edit button', () => {
    const editEmployee = jest.fn();
    renderList({ editEmployee });
    userEvent.click(screen.getByRole('button', { name: /editar/i }));
    expect(editEmployee).toHaveBeenCalled();
  });
});
