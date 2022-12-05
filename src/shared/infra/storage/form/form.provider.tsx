import {
  createContext,
  useState,
  FormEvent,
  PropsWithChildren,
  useCallback,
  Dispatch,
  SetStateAction,
  useMemo,
  useEffect,
} from 'react';
import { validator } from 'shared/domain/validator';

export type FormErrors<FormFields> = Partial<{
  [K in keyof FormFields]: string[];
}>;

export type FormValidations<FormFields> = Partial<{
  [K in keyof FormFields]: (value: any) => boolean;
}>;

export const FormContext = createContext<FormProviderData<object> | null>(null);

export type FormProviderData<FormFields = object> = {
  values: FormFields;
  onChangeField: (name: string, value: any) => void;
  resetForm: () => void;
  errors: FormErrors<FormFields>;
  setErrors: Dispatch<SetStateAction<FormErrors<FormFields>>>;
  setFieldErrors: (field: string, errors: string[] | null) => void;
  validations: FormValidations<FormFields>;
  wasSubmitted: boolean;
};

type Props<FormFields = object> = {
  initialValues: FormFields;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    formBag: FormProviderData<FormFields>,
  ) => void;
  validations?: FormValidations<FormFields>;
};

export const FormProvider = <FormFields extends object>({
  initialValues,
  children,
  onSubmit,
  validations = {},
}: PropsWithChildren<Props<FormFields>>) => {
  const [values, setValues] = useState<FormFields>(initialValues);
  const [errors, setErrors] = useState<FormErrors<FormFields>>({});
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);

  const setFieldErrors = useCallback(
    (field: string, errors: string[] | null) => {
      setErrors(init => ({
        ...init,
        [field]: errors,
      }));
    },
    [],
  );

  const onChangeField = useCallback((name: string, value: any) => {
    setValues(init => ({
      ...init,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, []);

  const valuesToProvide = useMemo(
    () => ({
      values,
      onChangeField,
      resetForm,
      errors,
      setErrors,
      setFieldErrors,
      validations,
      wasSubmitted,
    }),
    [errors, onChangeField, resetForm, setFieldErrors, values, wasSubmitted],
  );

  const _onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWasSubmitted(true);
    try {
      const formData = new FormData(e.currentTarget);
      const fieldValues = Object.fromEntries(formData.entries());
      validator
        .entityValidationSchema(
          validations as Record<string, (value: string) => boolean>,
        )
        .validate(fieldValues);
      onSubmit(e, valuesToProvide);
    } catch (e) {}
  };

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <FormContext.Provider value={valuesToProvide}>
      <form noValidate onSubmit={_onSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};
