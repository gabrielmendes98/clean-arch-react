import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import { makeHttpClient } from 'employee/infra/factories/http-client.factory';
import { EmployeeForm } from 'employee/infra/utils/employee-form';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { RegisterEmployeeView } from './views/register-employee.view';

export const makeRegisterEmployeePage = () => {
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(
    makeHttpClient(personsApiConfig.baseUrl, personsApiConfig.mock),
  );

  return (
    <RegisterEmployeeView
      registerEmployeeUseCase={registerEmployeeUseCase}
      formData={new EmployeeForm()}
    />
  );
};
