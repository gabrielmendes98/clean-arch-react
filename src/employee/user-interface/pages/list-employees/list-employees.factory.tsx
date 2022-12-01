import { DeleteEmployeeUseCase } from 'employee/application/use-cases/delete-employee.use-case';
import { ListEmployeesUseCase } from 'employee/application/use-cases/list-employees.use-case';
import { makeHttpClient } from 'employee/infra/factories/http-client.factory';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { ListEmployeesView } from './views/list-employees.view';

export const makeListEmployeesPage = () => {
  const listEmployeesUseCase = new ListEmployeesUseCase(
    makeHttpClient(personsApiConfig.baseUrl, personsApiConfig.mock),
  );
  const deleteEmployeeUseCase = new DeleteEmployeeUseCase(
    makeHttpClient(personsApiConfig.baseUrl, personsApiConfig.mock),
  );

  return (
    <ListEmployeesView
      listEmployeesUseCase={listEmployeesUseCase}
      deleteEmployeeUseCase={deleteEmployeeUseCase}
    />
  );
};
