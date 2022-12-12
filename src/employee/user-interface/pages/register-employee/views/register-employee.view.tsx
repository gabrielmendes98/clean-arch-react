import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import {
  EmployeeFormService,
  EmployeeFormFields,
} from 'employee/application/ports/employee-form.port';
import { EntityValidationError } from 'shared/domain/errors/validation.error';
import {
  FormProvider,
  FormProviderData,
} from 'shared/infra/providers/form.provider';
import { Form } from '../../../components/form/employee-form.component';

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
    { values, resetForm, setErrors }: FormProviderData<EmployeeFormFields>,
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
      <Form />
    </FormProvider>
  );
};
