import { useCallback } from 'react';
import {
  SignUpFormFields,
  SignUpFormService,
} from 'user/domain/interfaces/sign-up-form.interface';
import { UserFactory } from 'user/domain/factories/user.factory';
import { Password } from 'user/domain/value-objects/password.vo';
import { isObjectEmpty } from 'shared/infra/utils';

export const useSignUpForm = (): SignUpFormService => {
  const initialValues: SignUpFormFields = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validator = useCallback((values: SignUpFormFields) => {
    const errors: {
      [key in keyof SignUpFormFields]?: string[];
    } = {};
    const user = UserFactory.create({
      id: '',
      name: values.name,
      email: values.email,
      token: '',
    });

    Object.assign(errors, user.errors);

    const password = new Password(values.password);
    const confirmPassword = new Password(values.confirmPassword);

    Object.assign(errors, password.errors);
    Object.assign(errors, {
      confirmPassword: confirmPassword.errors?.password,
    });

    if (values.password !== values.confirmPassword) {
      if (!errors.confirmPassword) {
        errors.confirmPassword = [];
      }
      errors.confirmPassword.push('As senhas devem ser iguais');
    }

    return isObjectEmpty(errors) ? null : errors;
  }, []);

  return {
    initialValues,
    validator,
  };
};
