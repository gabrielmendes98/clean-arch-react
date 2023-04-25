import { FormEvent, PropsWithChildren } from 'react';
import { yup } from '../validator';

export type FormErrors<FormFields> = Partial<{
  [K in keyof FormFields]: string[];
}>;

export type FormValidations<FormFields> = Partial<{
  [K in keyof FormFields]: yup.AnySchema;
}>;

export interface FormStorageService<FormFields = object> {
  values: FormFields;
  onChangeField: (name: string, value: any) => void;
  resetForm: () => void;
  errors: FormErrors<FormFields>;
  setErrors: (errors: FormErrors<FormFields>) => void;
  setFieldErrors: (field: string, errors: string[] | null) => void;
  validations?: FormValidations<FormFields>;
  wasSubmitted: boolean;
  validator?: (fieldValues: FormFields) => FormErrors<FormFields> | null;
  setValues: (values: FormFields) => void;
}

export interface FormProviderProps<FormFields = object>
  extends PropsWithChildren {
  initialValues: FormFields;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    formBag: FormStorageService<FormFields>,
  ) => void;
  validations?: FormValidations<FormFields>;
  validator?: (fieldValues: FormFields) => FormErrors<FormFields> | null;
}
