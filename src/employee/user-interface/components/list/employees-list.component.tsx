import { EmployeeListItem } from 'employee/domain/entities/employee-list.entity';
import { PAGES } from 'shared/domain/constants/pages';
import { Button } from 'shared/user-interface/components/button/button.component';
import { useNavigation } from 'shared/user-interface/routes/navigation';

export type Props = {
  employees: {
    name: string;
    salary: number;
    id: string;
    document: string;
    email: string;
  }[];
  deleteEmployee: (employee: EmployeeListItem) => void;
};

export const EmployeesList = ({ employees, deleteEmployee }: Props) => {
  const { navigate } = useNavigation();

  const handleEdit = (id: string) => {
    navigate(PAGES.EDIT_EMPLOYEE(id));
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
