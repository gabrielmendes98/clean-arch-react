import { useCallback } from 'react';
import {
  LoginFormFields,
  LoginFormService,
} from 'user/domain/interfaces/login-form.interface';
import { Password } from 'user/domain/value-objects/password.vo';
import { Email } from 'shared/domain/value-objects/email.vo';
import { isObjectEmpty } from 'shared/infra/utils';

export const useLoginForm = (): LoginFormService => {
  const initialValues: LoginFormFields = {
    email: '',
    password: '',
  };

  const validator = useCallback((values: LoginFormFields) => {
    const errors = {};

    const email = new Email(values.email);
    const password = new Password(values.password);

    Object.assign(errors, email.errors);
    Object.assign(errors, password.errors);

    return isObjectEmpty(errors) ? null : errors;
  }, []);

  return {
    initialValues,
    validator,
  };
};
