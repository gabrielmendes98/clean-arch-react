import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { makeHttpClient } from 'shared/infra/factories/http-client.factory';
import { RegisterEmployeeMainComponent } from './views/register-employee.view';

export const makeRegisterEmployeePage = () => {
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(
    makeHttpClient(),
    personsApiConfig.baseUrl,
  );

  return (
    <RegisterEmployeeMainComponent
      registerEmployeeUseCase={registerEmployeeUseCase}
    />
  );
};
