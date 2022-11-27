import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import { makeHttpClient } from 'employee/infra/factories/http-client.factory';
import {
  initialValues,
  parseFormToInput,
} from 'employee/infra/utils/employee-form.utils';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { RegisterEmployeeMainComponent } from './views/register-employee.view';

export const makeRegisterEmployeePage = () => {
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(
    makeHttpClient(personsApiConfig.baseUrl, personsApiConfig.mock),
  );

  return (
    <RegisterEmployeeMainComponent
      registerEmployeeUseCase={registerEmployeeUseCase}
      initialValues={initialValues}
      parseFormToInput={parseFormToInput}
    />
  );
};
