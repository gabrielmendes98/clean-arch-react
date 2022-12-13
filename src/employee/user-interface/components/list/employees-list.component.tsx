import { EmployeeListItem } from 'employee/domain/entities/employee-list.entity';
import { pages } from 'shared/domain/config/pages';
import { Button } from 'shared/user-interface/components/button/button.component';

export type Props = {
  employees: {
    name: string;
    salary: number;
    id: string;
    document: string;
    email: string;
  }[];
  deleteEmployee: (employee: EmployeeListItem) => void;
  navigate: (url: string) => void;
};

export const EmployeesList = ({
  employees,
  deleteEmployee,
  navigate,
}: Props) => {
  const handleEdit = (id: string) => {
    navigate(pages.updateEmployee(id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Salário</th>
          <th>Documento</th>
          <th>E-mail</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.salary}</td>
            <td>{employee.document}</td>
            <td>{employee.email}</td>
            <td>
              <Button onClick={() => deleteEmployee(employee)}>Deletar</Button>
              <Button onClick={() => handleEdit(employee.id)}>Editar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
