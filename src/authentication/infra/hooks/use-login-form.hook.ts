import {
  LoginFormFields,
  LoginFormService,
  LoginFormValidations,
} from 'authentication/domain/interfaces/login-form.interface';
import { Password } from 'authentication/domain/value-objects/password.vo';
import { Email } from 'shared/domain/value-objects/email.vo';

export const useLoginForm = (): LoginFormService => {
  const initialValues: LoginFormFields = {
    email: '',
    password: '',
  };

  const validations: LoginFormValidations = {
    email: Email.validate,
    password: Password.validate,
  };

  return {
    initialValues,
    validations,
  };
};
