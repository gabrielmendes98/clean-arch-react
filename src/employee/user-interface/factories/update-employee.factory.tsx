import { useEmployeeForm } from 'employee/infra/hooks/use-employee-form.hook';
import { EmployeeFormService } from 'employee/domain/interfaces/employee-form.interface';
import { UpdateEmployeeUseCase } from 'employee/use-cases/update-employee.use-case';
import { makeEmployeeService } from 'employee/infra/factories/employee-service.factory';
import { GetEmployeeUseCase } from 'employee/use-cases/get-employee.use-case';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { useRouter } from 'shared/infra/hooks/use-router.hook';
import { useNotification } from 'shared/infra/hooks/use-notification.hook';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { UpdateEmployeeView } from '../containers/update-employee.container';

export const MakeUpdateEmployeePage = () => {
  const formService: EmployeeFormService = useEmployeeForm();
  const routerService: RouterService = useRouter();
  const notifier: NotificationService = useNotification();
  const updateEmployeeUseCase = new UpdateEmployeeUseCase(
    makeEmployeeService(),
    routerService,
    notifier,
  );
  const getEmployeeUseCase = new GetEmployeeUseCase(makeEmployeeService());

  return (
    <UpdateEmployeeView
      getEmployeeUseCase={getEmployeeUseCase}
      updateEmployeeUseCase={updateEmployeeUseCase}
      formService={formService}
      routerService={routerService}
    />
  );
};
