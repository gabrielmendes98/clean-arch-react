export interface LoginFormFields {
  email: string;
  password: string;
}

export interface LoginFormValidations {
  email: (value: any) => boolean;
  password: (value: any) => boolean;
}

export interface LoginFormService {
  initialValues: LoginFormFields;
  validations: LoginFormValidations;
}
