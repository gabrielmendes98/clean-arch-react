import { makeHttpClient } from 'employee/infra/factories/http-client.factory';
import { useEmployeeForm } from 'employee/infra/adapters/employee-form.adapter';
import { EmployeeFormService } from 'employee/application/ports/employee-form.port';
import { UpdateEmployeeUseCase } from 'employee/application/use-cases/update-employee.use-case';
import { GetEmployeeUseCase } from 'employee/application/use-cases/get-employee.use-case';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { RouterService } from 'shared/application/router.port';
import { useRouter } from 'shared/infra/adapters/router.adapter';
import { UpdateEmployeeView } from './views/update-employee.view';

export const MakeUpdateEmployeePage = () => {
  const formService: EmployeeFormService = useEmployeeForm();
  const routerService: RouterService = useRouter();
  const updateEmployeeUseCase = new UpdateEmployeeUseCase(
    makeHttpClient(personsApiConfig.baseUrl, personsApiConfig.mock),
  );
  const getEmployeeUseCase = new GetEmployeeUseCase(
    makeHttpClient(personsApiConfig.baseUrl, personsApiConfig.mock),
  );

  return (
    <UpdateEmployeeView
      getEmployeeUseCase={getEmployeeUseCase}
      updateEmployeeUseCase={updateEmployeeUseCase}
      formService={formService}
      routerService={routerService}
    />
  );
};
