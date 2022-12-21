import { EmployeeListService } from 'employee/application/ports/employee-list.port';
import { DeleteEmployeeFromListUseCase } from 'employee/application/use-cases/delete-employee-from-list.use-case';
import { ListEmployeesUseCase } from 'employee/application/use-cases/list-employees.use-case';
import { useEmployeeList } from 'employee/infra/adapters/employee-list.adapter';
import { makeEmployeeGateway } from 'employee/infra/factories/employee-gateway.factory';
import { RouterService } from 'shared/application/router.port';
import { useRouter } from 'shared/infra/adapters/router.adapter';
import { ListEmployeesView } from './views/list-employees.view';

export const MakeListEmployeesPage = () => {
  const employeeListService: EmployeeListService = useEmployeeList();
  const routerService: RouterService = useRouter();
  const listEmployeesUseCase = new ListEmployeesUseCase(makeEmployeeGateway());
  const deleteEmployeeUseCase = new DeleteEmployeeFromListUseCase(
    makeEmployeeGateway(),
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
