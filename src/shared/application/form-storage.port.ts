export type FormErrors<FormFields> = Partial<{
  [K in keyof FormFields]: string[];
}>;

export type FormValidations<FormFields> = Partial<{
  [K in keyof FormFields]: (value: any) => boolean;
}>;

export interface FormStorageService<FormFields = object> {
  values: FormFields;
  onChangeField: (name: string, value: any) => void;
  resetForm: () => void;
  errors: FormErrors<FormFields>;
  setErrors: (errors: FormErrors<FormFields>) => void;
  setFieldErrors: (field: string, errors: string[] | null) => void;
  validations: FormValidations<FormFields>;
  wasSubmitted: boolean;
}
