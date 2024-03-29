import { useEffect, useMemo, useState } from 'react';
import { Employee } from 'employee/domain/entities/employee.entity';
import { GetEmployeeUseCase } from 'employee/use-cases/get-employee.use-case';
import { UpdateEmployeeUseCase } from 'employee/use-cases/update-employee.use-case';
import {
  EmployeeFormFields,
  EmployeeFormService,
} from 'employee/domain/interfaces/employee-form.interface';
import { RouterService } from 'shared/domain/interfaces/router.interface';
import { FormStorageService } from 'shared/domain/interfaces/form-storage.interface';
import { FormProvider } from 'shared/infra/providers/form/form.provider';
import { EmployeeForm } from '../components/employee-form.component';

type Props = {
  getEmployeeUseCase: GetEmployeeUseCase;
  updateEmployeeUseCase: UpdateEmployeeUseCase;
  formService: EmployeeFormService;
  routerService: RouterService;
};

export const UpdateEmployeeContainer = ({
  getEmployeeUseCase,
  updateEmployeeUseCase,
  formService,
  routerService,
}: Props) => {
  const { initialValues, parseEntityToValues, parseValuesToInput, validator } =
    formService;
  const { getUrlParams } = routerService;
  const { id } = getUrlParams();
  const [employee, setEmployee] = useState<Employee>();

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    { values }: FormStorageService<EmployeeFormFields>,
  ) =>
    updateEmployeeUseCase.execute({
      id: String(employee?.id),
      ...parseValuesToInput(values),
    });

  const values = useMemo(
    () => (employee ? parseEntityToValues(employee) : initialValues),
    [employee],
  );

  useEffect(() => {
    if (id) {
      getEmployeeUseCase.execute({ id }).then(setEmployee);
    }
  }, []);

  return (
    <FormProvider
      onSubmit={onSubmit}
      initialValues={values}
      validator={validator}
    >
      <EmployeeForm />
    </FormProvider>
  );
};
