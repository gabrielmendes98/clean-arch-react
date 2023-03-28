import { EmployeeListStorage } from 'employee/domain/interfaces/employee-list.interface';
import { EmployeeRepositoryFactory } from 'employee/infra/factories/employee-repository.factory';
import { useEmployeeList } from 'employee/infra/hooks/use-employee-list.hook';
import { DeleteEmployeeFromListUseCase } from 'employee/use-cases/delete-employee-from-list.use-case';
import { ListEmployeesUseCase } from 'employee/use-cases/list-employees.use-case';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { useRouter } from 'shared/infra/hooks/use-router.hook';
import { ListEmployeesContainer } from '../containers/list-employees.container';

export const MakeListEmployeesContainer = () => {
  const employeeListService: EmployeeListStorage = useEmployeeList();
  const routerService: RouterService = useRouter();
  const listEmployeesUseCase = new ListEmployeesUseCase(
    EmployeeRepositoryFactory.create(),
  );
  const deleteEmployeeUseCase = new DeleteEmployeeFromListUseCase(
    EmployeeRepositoryFactory.create(),
    employeeListService,
  );

  return (
    <ListEmployeesContainer
      listEmployeesUseCase={listEmployeesUseCase}
      deleteEmployeeUseCase={deleteEmployeeUseCase}
      employeeListStorage={employeeListService}
      routerService={routerService}
    />
  );
};
