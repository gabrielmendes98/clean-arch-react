import {
  SignUpFormFields,
  SignUpFormService,
} from 'authentication/domain/interfaces/sign-up-form.interface';
import { passwordYupValidations } from 'authentication/domain/validator/password.yup.validator';
import { yup } from 'shared/domain/validator';
import { emailYupValidations } from 'shared/domain/validator/value-object-validators/email.yup.validator';

export const useSignUpForm = (): SignUpFormService => {
  const initialValues: SignUpFormFields = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validations: SignUpFormService['validations'] = {
    name: yup.string().required().label('Nome'),
    email: emailYupValidations.email,
    password: passwordYupValidations.password,
    confirmPassword: passwordYupValidations.password,
  };

  return {
    initialValues,
    validations,
  };
};
