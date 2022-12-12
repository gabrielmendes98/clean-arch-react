import { useEffect, useMemo, useState } from 'react';
import {
  EmployeeFormService,
  EmployeeFormFields,
} from 'employee/application/ports/employee-form.port';
import { UpdateEmployeeUseCase } from 'employee/application/use-cases/update-employee.use-case';
import { GetEmployeeUseCase } from 'employee/application/use-cases/get-employee.use-case';
import { Employee } from 'employee/domain/entities/employee.entity';
import { EntityValidationError } from 'shared/domain/errors/validation.error';
import { FormProvider } from 'shared/infra/providers/form.provider';
import { RouterService } from 'shared/application/router.port';
import { FormStorageService } from 'shared/application/form-storage.port';
import { Form } from '../../../components/form/employee-form.component';

type Props = {
  getEmployeeUseCase: GetEmployeeUseCase;
  updateEmployeeUseCase: UpdateEmployeeUseCase;
  formService: EmployeeFormService;
  routerService: RouterService;
};

export const UpdateEmployeeView = ({
  getEmployeeUseCase,
  updateEmployeeUseCase,
  formService,
  routerService,
}: Props) => {
  const { initialValues, parseValuesToInput, parseEntityToValues } =
    formService;
  const { getUrlParams } = routerService;
  const { id } = getUrlParams();
  const [employee, setEmployee] = useState<Employee>();

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    { values, setErrors }: FormStorageService<EmployeeFormFields>,
  ) => {
    try {
      await updateEmployeeUseCase.execute({
        id: employee!.id,
        ...parseValuesToInput(values),
      });
    } catch (e) {
      if (e instanceof EntityValidationError) {
        setErrors(e.errors);
      }
    }
  };

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
    <FormProvider onSubmit={onSubmit} initialValues={values}>
      <Form />
    </FormProvider>
  );
};
