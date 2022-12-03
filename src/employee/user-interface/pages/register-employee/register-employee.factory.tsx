import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import { makeHttpClient } from 'employee/infra/factories/http-client.factory';
import { useEmployeeForm } from 'employee/infra/adapters/employee-form.adapter';
import { EmployeeFormService } from 'employee/application/ports/employee-form.port';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { RegisterEmployeeView } from './views/register-employee.view';

export const MakeRegisterEmployeePage = () => {
  const formService: EmployeeFormService = useEmployeeForm();
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(
    makeHttpClient(personsApiConfig.baseUrl, personsApiConfig.mock),
  );

  return (
    <RegisterEmployeeView
      registerEmployeeUseCase={registerEmployeeUseCase}
      formService={formService}
    />
  );
};
