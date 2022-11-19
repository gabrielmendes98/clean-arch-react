import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import { AxiosAdapter } from 'shared/infra/adapters/axios.adapter';
import { RegisterEmployeeMainComponent } from './components/main.component';

export const makeRegisterEmployeePage = () => {
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(
    new AxiosAdapter(),
  );

  return (
    <RegisterEmployeeMainComponent
      registerEmployeeUseCase={registerEmployeeUseCase}
    />
  );
};
