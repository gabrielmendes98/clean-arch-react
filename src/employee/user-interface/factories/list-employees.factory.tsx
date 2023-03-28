import { EmployeeListService } from 'employee/domain/interfaces/employee-list.interface';
import { makeEmployeeService } from 'employee/infra/factories/employee-service.factory';
import { useEmployeeList } from 'employee/infra/hooks/use-employee-list.hook';
import { DeleteEmployeeFromListUseCase } from 'employee/use-cases/delete-employee-from-list.use-case';
import { ListEmployeesUseCase } from 'employee/use-cases/list-employees.use-case';
import { RouterService } from 'shared/application/router.port';
import { useRouter } from 'shared/infra/adapters/router.adapter';
import { ListEmployeesView } from '../containers/list-employees.container';

export const MakeListEmployeesPage = () => {
  const employeeListService: EmployeeListService = useEmployeeList();
  const routerService: RouterService = useRouter();
  const listEmployeesUseCase = new ListEmployeesUseCase(makeEmployeeService());
  const deleteEmployeeUseCase = new DeleteEmployeeFromListUseCase(
    makeEmployeeService(),
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
