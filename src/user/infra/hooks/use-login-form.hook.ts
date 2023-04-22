import {
  LoginFormFields,
  LoginFormService,
} from 'user/domain/interfaces/login-form.interface';
import { passwordYupValidations } from 'user/domain/validator/password.yup.validator';
import { emailYupValidations } from 'shared/domain/validator/value-object-validators/email.yup.validator';

export const useLoginForm = (): LoginFormService => {
  const initialValues: LoginFormFields = {
    email: '',
    password: '',
  };

  const validations: LoginFormService['validations'] = {
    email: emailYupValidations.email,
    password: passwordYupValidations.password,
  };

  return {
    initialValues,
    validations,
  };
};
