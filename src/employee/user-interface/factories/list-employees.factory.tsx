import { EmployeeListStorage } from 'employee/domain/interfaces/employee-list.interface';
import { EmployeeRepositoryFactory } from 'employee/infra/factories/employee-repository.factory';
import { useEmployeeListStorage } from 'employee/infra/hooks/use-employee-list.hook';
import { DeleteEmployeeUseCase } from 'employee/use-cases/delete-employee.use-case';
import { ListEmployeesUseCase } from 'employee/use-cases/list-employees.use-case';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { useRouter } from 'shared/infra/hooks/use-router.hook';
import { useNotification } from 'shared/infra/hooks/use-notification.hook';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { ListEmployeesContainer } from '../containers/list-employees.container';

export const MakeListEmployeesContainer = () => {
  const notifier: NotificationService = useNotification();
  const deleteEmployeeUseCase = new DeleteEmployeeUseCase(
    EmployeeRepositoryFactory.create(),
    notifier,
  );
  const employeeListStorage: EmployeeListStorage = useEmployeeListStorage(
    deleteEmployeeUseCase,
  );
  const routerService: RouterService = useRouter();
  const listEmployeesUseCase = new ListEmployeesUseCase(
    EmployeeRepositoryFactory.create(),
  );

  return (
    <ListEmployeesContainer
      listEmployeesUseCase={listEmployeesUseCase}
      employeeListStorage={employeeListStorage}
      routerService={routerService}
    />
  );
};
