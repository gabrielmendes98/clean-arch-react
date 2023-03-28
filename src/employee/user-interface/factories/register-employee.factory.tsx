import { useEmployeeForm } from 'employee/infra/hooks/use-employee-form.hook';
import { EmployeeFormService } from 'employee/domain/interfaces/employee-form.interface';
import { RegisterEmployeeUseCase } from 'employee/use-cases/register-employee.use-case';
import { makeEmployeeService } from 'employee/infra/factories/employee-service.factory';
import { NotificationService } from 'shared/application/notification.port';
import { useNotification } from 'shared/infra/adapters/notification.adapter';
import { RegisterEmployeeView } from '../containers/register-employee.container';

export const MakeRegisterEmployeePage = () => {
  const formService: EmployeeFormService = useEmployeeForm();
  const notifier: NotificationService = useNotification();
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(
    makeEmployeeService(),
    notifier,
  );

  return (
    <RegisterEmployeeView
      registerEmployeeUseCase={registerEmployeeUseCase}
      formService={formService}
    />
  );
};
