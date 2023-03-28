export interface SignUpFormService {
  initialValues: SignUpFormFields;
  validations: SignUpFormValidations;
}

export interface SignUpFormFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormValidations {
  name: (value: any) => boolean;
  email: (value: any) => boolean;
  password: (value: any) => boolean;
  confirmPassword: (value: any) => boolean;
}
