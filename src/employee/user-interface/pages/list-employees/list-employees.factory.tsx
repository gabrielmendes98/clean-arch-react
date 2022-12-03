import { EmployeeListService } from 'employee/application/ports/employee-list.port';
import { DeleteEmployeeFromListUseCase } from 'employee/application/use-cases/delete-employee-from-list.use-case';
import { ListEmployeesUseCase } from 'employee/application/use-cases/list-employees.use-case';
import { useEmployeeList } from 'employee/infra/adapters/employee-list.adapter';
import { makeHttpClient } from 'employee/infra/factories/http-client.factory';
import { RouterService } from 'shared/application/router.port';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { useRouter } from 'shared/infra/adapters/router.adapter';
import { ListEmployeesView } from './views/list-employees.view';

export const MakeListEmployeesPage = () => {
  const employeeListService: EmployeeListService = useEmployeeList();
  const routerService: RouterService = useRouter();
  const listEmployeesUseCase = new ListEmployeesUseCase(
    makeHttpClient(personsApiConfig.baseUrl, personsApiConfig.mock),
  );
  const deleteEmployeeUseCase = new DeleteEmployeeFromListUseCase(
    makeHttpClient(personsApiConfig.baseUrl, personsApiConfig.mock),
    employeeListService,
  );

  return (
    <ListEmployeesView
      listEmployeesUseCase={listEmployeesUseCase}
      deleteEmployeeUseCase={deleteEmployeeUseCase}
      employeeListService={employeeListService}
      routerService={routerService}
    />
  );
};
