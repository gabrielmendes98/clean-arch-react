import {
  SignUpFormFields,
  SignUpFormService,
  SignUpFormValidations,
} from 'authentication/domain/interfaces/sign-up-form.interface';
import { Password } from 'authentication/domain/value-objects/password.vo';
import { validator } from 'shared/domain/validator';
import { Email } from 'shared/domain/value-objects/email.vo';

export const useSignUpForm = (): SignUpFormService => {
  const initialValues: SignUpFormFields = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validations: SignUpFormValidations = {
    name: (value: string) =>
      validator.string().required().validateAttribute(value, 'Nome'),
    email: Email.validate,
    password: Password.validate,
    confirmPassword: Password.validate,
  };

  return {
    initialValues,
    validations,
  };
};
