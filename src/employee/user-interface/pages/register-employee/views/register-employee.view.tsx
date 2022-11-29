import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import {
  EmployeeForm,
  EmployeeFormFields,
} from 'employee/infra/utils/employee-form';
import { FormProvider } from 'shared/infra/store/form/form.store';
import { Form } from '../../../components/form/employee-form.component';

type Props = {
  registerEmployeeUseCase: RegisterEmployeeUseCase;
  formData: EmployeeForm;
};

export const RegisterEmployeeMainComponent = ({
  registerEmployeeUseCase,
  formData,
}: Props) => {
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: EmployeeFormFields,
  ) => {
    try {
      await registerEmployeeUseCase.execute(
        EmployeeForm.parseFormToInput(values),
      );
      console.log('sucesso');
    } catch (e) {
      console.log('erro');
      console.log(JSON.parse(JSON.stringify(e)));
    }
  };

  return (
    <FormProvider onSubmit={onSubmit} initialValues={formData.toJSON()}>
      <Form />
    </FormProvider>
  );
};
