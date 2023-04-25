import { Errors } from 'shared/domain/interfaces/errors.interface';

export interface LoginFormService {
  initialValues: LoginFormFields;
  validator: (values: LoginFormFields) => Errors | null;
}

export interface LoginFormFields {
  email: string;
  password: string;
}
