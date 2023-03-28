import { useEmployeeForm } from 'employee/infra/hooks/use-employee-form.hook';
import { EmployeeFormService } from 'employee/domain/interfaces/employee-form.interface';
import { RegisterEmployeeUseCase } from 'employee/use-cases/register-employee.use-case';
import { makeEmployeeRepository } from 'employee/infra/factories/employee-repository.factory';
import { useNotification } from 'shared/infra/hooks/use-notification.hook';
import { NotificationService } from 'shared/domain/interfaces/notification.interface';
import { RegisterEmployeeView } from '../containers/register-employee.container';

export const MakeRegisterEmployeePage = () => {
  const formService: EmployeeFormService = useEmployeeForm();
  const notifier: NotificationService = useNotification();
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(
    makeEmployeeRepository(),
    notifier,
  );

  return (
    <RegisterEmployeeView
      registerEmployeeUseCase={registerEmployeeUseCase}
      formService={formService}
    />
  );
};
