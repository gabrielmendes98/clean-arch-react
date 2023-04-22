export interface LoginFormService {
  initialValues: LoginFormFields;
  validations: Record<keyof LoginFormFields, any>;
}

export interface LoginFormFields {
  email: string;
  password: string;
}
