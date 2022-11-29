import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import {
  EmployeeForm,
  EmployeeFormFields,
} from 'employee/infra/utils/employee-form';
import {
  Alert,
  Props as AlertProps,
} from 'employee/user-interface/components/alert/alert.component';
import { Box } from 'employee/user-interface/components/box/box.component';
import { useState } from 'react';
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
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: EmployeeFormFields,
  ) => {
    try {
      await registerEmployeeUseCase.execute(
        EmployeeForm.parseFormToInput(values),
      );
      setAlert({
        type: 'success',
        message: 'Funcionário cadastrado com sucesso!',
      });
    } catch (e: any) {
      console.log(JSON.parse(JSON.stringify(e)));
      setAlert({
        type: 'error',
        message: e.message || 'error message',
      });
    }
  };

  return (
    <Box>
      <FormProvider onSubmit={onSubmit} initialValues={formData.toJSON()}>
        <Form />
      </FormProvider>
      {alert && <Alert type={alert.type} message={alert.message} />}
    </Box>
  );
};
