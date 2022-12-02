import { useState } from 'react';
import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import {
  EmployeeForm,
  EmployeeFormFields,
} from 'employee/infra/utils/employee-form';
import {
  Alert,
  Props as AlertProps,
} from 'employee/user-interface/components/alert/alert.component';
import { FormBox } from 'employee/user-interface/components/form-box/form-box.component';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { EntityValidationError } from 'shared/domain/errors/validation.error';
import {
  FormProvider,
  FormProviderData,
} from 'shared/infra/storage/form/form.provider';
import { Form } from '../../../components/form/employee-form.component';

type Props = {
  registerEmployeeUseCase: RegisterEmployeeUseCase;
  formData: EmployeeForm;
};

export const RegisterEmployeeView = ({
  registerEmployeeUseCase,
  formData,
}: Props) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    { values, resetForm, setErrors }: FormProviderData<EmployeeFormFields>,
  ) => {
    try {
      await registerEmployeeUseCase.execute(
        EmployeeForm.parseFormToInput(values),
      );
      setAlert({
        type: 'success',
        message: 'Funcionário cadastrado com sucesso!',
      });
      resetForm();
    } catch (e) {
      if (e instanceof EntityValidationError) {
        setErrors(e.errors);
      }
      if (e instanceof UnexpectedError) {
        setAlert({
          type: 'error',
          message: e.message,
        });
      }
    }
  };

  return (
    <FormBox>
      <FormProvider onSubmit={onSubmit} initialValues={formData.toJSON()}>
        <Form />
      </FormProvider>
      {alert && <Alert type={alert.type} message={alert.message} />}
    </FormBox>
  );
};
