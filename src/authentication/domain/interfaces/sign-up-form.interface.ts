export interface SignUpFormService {
  initialValues: SignUpFormFields;
  validations: Record<keyof SignUpFormFields, any>;
}

export interface SignUpFormFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
