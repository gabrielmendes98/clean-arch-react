import { RegisterEmployeeUseCase } from 'employee/use-cases/register-employee.use-case';
import {
  EmployeeFormFields,
  EmployeeFormService,
} from 'employee/domain/interfaces/employee-form.interface';
import { EntityValidationError } from 'shared/domain/errors/validation.error';
import { FormProvider } from 'shared/infra/providers/form.provider';
import { FormStorageService } from 'shared/application/form-storage.port';
import { EmployeeForm } from '../components/employee-form.component';

type Props = {
  registerEmployeeUseCase: RegisterEmployeeUseCase;
  formService: EmployeeFormService;
};

export const RegisterEmployeeView = ({
  registerEmployeeUseCase,
  formService,
}: Props) => {
  const { initialValues, parseValuesToInput } = formService;

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    { values, resetForm, setErrors }: FormStorageService<EmployeeFormFields>,
  ) => {
    try {
      await registerEmployeeUseCase.execute(parseValuesToInput(values));
      resetForm();
    } catch (e) {
      if (e instanceof EntityValidationError) {
        setErrors(e.errors);
      }
    }
  };

  return (
    <FormProvider onSubmit={onSubmit} initialValues={initialValues}>
      <EmployeeForm />
    </FormProvider>
  );
};
