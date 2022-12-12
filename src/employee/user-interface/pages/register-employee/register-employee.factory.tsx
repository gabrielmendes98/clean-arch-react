import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import { makeHttpClient } from 'employee/infra/factories/http-client.factory';
import { useEmployeeForm } from 'employee/infra/adapters/employee-form.adapter';
import { EmployeeFormService } from 'employee/application/ports/employee-form.port';
import { useNotification } from 'shared/infra/adapters/notification.adapter';
import { NotificationService } from 'shared/application/notification.port';
import { RegisterEmployeeView } from './views/register-employee.view';

export const MakeRegisterEmployeePage = () => {
  const formService: EmployeeFormService = useEmployeeForm();
  const notifier: NotificationService = useNotification();
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(
    makeHttpClient(),
    notifier,
  );

  return (
    <RegisterEmployeeView
      registerEmployeeUseCase={registerEmployeeUseCase}
      formService={formService}
    />
  );
};
