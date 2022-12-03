import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import { makeHttpClient } from 'employee/infra/factories/http-client.factory';
import { useEmployeeForm } from 'employee/infra/adapters/employee-form.adapter';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { RegisterEmployeeView } from './views/register-employee.view';

export const MakeRegisterEmployeePage = () => {
  const form = useEmployeeForm();
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(
    makeHttpClient(personsApiConfig.baseUrl, personsApiConfig.mock),
  );

  return (
    <RegisterEmployeeView
      registerEmployeeUseCase={registerEmployeeUseCase}
      form={form}
    />
  );
};
