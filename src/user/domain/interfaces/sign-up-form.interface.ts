import { Errors } from 'shared/domain/interfaces/errors.interface';

export interface SignUpFormService {
  initialValues: SignUpFormFields;
  validator: (values: SignUpFormFields) => Errors | null;
}

export interface SignUpFormFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
