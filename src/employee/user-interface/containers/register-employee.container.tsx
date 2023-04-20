import { RegisterEmployeeUseCase } from 'employee/use-cases/register-employee.use-case';
import {
  EmployeeFormFields,
  EmployeeFormService,
} from 'employee/domain/interfaces/employee-form.interface';
import { FormProvider } from 'shared/infra/providers/form.provider';
import { FormStorageService } from 'shared/domain/interfaces/form-storage.interface';
import { EmployeeForm } from '../components/employee-form.component';

type Props = {
  registerEmployeeUseCase: RegisterEmployeeUseCase;
  formService: EmployeeFormService;
};

export const RegisterEmployeeContainer = ({
  registerEmployeeUseCase,
  formService,
}: Props) => {
  const { initialValues, validations, parseValuesToInput } = formService;

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    { values, resetForm }: FormStorageService<EmployeeFormFields>,
  ) => {
    await registerEmployeeUseCase.execute(parseValuesToInput(values));
    resetForm();
  };

  return (
    <FormProvider
      onSubmit={onSubmit}
      initialValues={initialValues}
      validations={validations}
    >
      <EmployeeForm />
    </FormProvider>
  );
};
