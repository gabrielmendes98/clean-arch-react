import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import { EmployeesInMemoryHttpClientAdapter } from 'employee/infra/adapters/in-memory.adapter';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { RegisterEmployeeMainComponent } from './views/register-employee.view';

export const makeRegisterEmployeePage = () => {
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(
    new EmployeesInMemoryHttpClientAdapter(personsApiConfig.baseUrl),
  );

  return (
    <RegisterEmployeeMainComponent
      registerEmployeeUseCase={registerEmployeeUseCase}
    />
  );
};
