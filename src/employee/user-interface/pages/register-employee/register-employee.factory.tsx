import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import { useEmployeeForm } from 'employee/infra/adapters/employee-form.adapter';
import { EmployeeFormService } from 'employee/application/ports/employee-form.port';
import { makeEmployeeGateway } from 'employee/infra/factories/employee-gateway.factory';
import { useNotification } from 'shared/infra/adapters/notification.adapter';
import { NotificationService } from 'shared/application/notification.port';
import { RegisterEmployeeView } from './views/register-employee.view';

export const MakeRegisterEmployeePage = () => {
  const formService: EmployeeFormService = useEmployeeForm();
  const notifier: NotificationService = useNotification();
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(
    makeEmployeeGateway(),
    notifier,
  );

  return (
    <RegisterEmployeeView
      registerEmployeeUseCase={registerEmployeeUseCase}
      formService={formService}
    />
  );
};
