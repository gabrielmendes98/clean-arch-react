import {
  Input,
  RegisterEmployeeUseCase,
} from 'employee/application/use-cases/register-employee.use-case';
import { FormData } from 'employee/infra/utils/employee-form.utils';
import { FormProvider } from 'shared/infra/store/form/form.store';
import { Form } from '../../../components/form/employee-form.component';

type Props = {
  registerEmployeeUseCase: RegisterEmployeeUseCase;
  initialValues: FormData;
  parseFormToInput: (formData: FormData) => Input;
};

export const RegisterEmployeeMainComponent = ({
  registerEmployeeUseCase,
  initialValues,
  parseFormToInput,
}: Props) => {
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: FormData,
  ) => {
    try {
      await registerEmployeeUseCase.execute(parseFormToInput(values));
      console.log('sucesso');
    } catch (e) {
      console.log('caiu aqui');
      console.log(JSON.parse(JSON.stringify(e)));
    }
  };

  return (
    <FormProvider onSubmit={onSubmit} initialValues={initialValues}>
      <Form />
    </FormProvider>
  );
};
