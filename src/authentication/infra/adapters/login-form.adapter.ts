import {
  LoginFormFields,
  LoginFormService,
  LoginFormValidations,
} from 'authentication/application/ports/login-form.port';
import { Email } from 'shared/domain/value-objects/email.vo';
import { Password } from 'shared/domain/value-objects/password.vo';

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
