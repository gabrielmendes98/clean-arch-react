import { useEmployeeForm } from 'employee/infra/hooks/use-employee-form.hook';
import { EmployeeFormService } from 'employee/domain/interfaces/employee-form.interface';
import { UpdateEmployeeUseCase } from 'employee/use-cases/update-employee.use-case';
import { makeEmployeeService } from 'employee/infra/factories/employee-service.factory';
import { GetEmployeeUseCase } from 'employee/use-cases/get-employee.use-case';
import { useNotification } from 'shared/infra/adapters/notification.adapter';
import { RouterService } from 'shared/application/router.port';
import { useRouter } from 'shared/infra/adapters/router.adapter';
import { NotificationService } from 'shared/application/notification.port';
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
