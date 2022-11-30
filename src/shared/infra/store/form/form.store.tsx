import {
  createContext,
  useState,
  FormEvent,
  PropsWithChildren,
  useCallback,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';

export type GenericObject = {
  [key: string]: any;
};

export type FormErrors<FormFields> = Partial<{
  [K in keyof FormFields]: string[];
}>;

export const FormContext =
  createContext<FormProviderData<GenericObject> | null>(null);

export type FormProviderData<FormFields extends GenericObject> = {
  values: FormFields;
  onChangeField: (name: string, value: any) => void;
  resetForm: () => void;
  errors: {} | FormErrors<FormFields>;
  setErrors: Dispatch<SetStateAction<{} | FormErrors<FormFields>>>;
  setFieldErrors: (field: string, errors: string[] | null) => void;
};

type Props<FormFields extends GenericObject> = {
  initialValues: FormFields;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    formBag: FormProviderData<FormFields>,
  ) => void;
};

export const FormProvider = <FormFields extends GenericObject>({
  initialValues,
  children,
  onSubmit,
}: PropsWithChildren<Props<FormFields>>) => {
  const [values, setValues] = useState<FormFields>(initialValues);
  const [errors, setErrors] = useState<FormErrors<FormFields> | {}>({});

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valuesToProvide = useMemo(
    () => ({
      values,
      onChangeField,
      resetForm,
      errors,
      setErrors,
      setFieldErrors,
    }),
    [errors, onChangeField, resetForm, setFieldErrors, values],
  );

  const _onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e, valuesToProvide);
  };

  return (
    <FormContext.Provider value={valuesToProvide}>
      <form onSubmit={_onSubmit}>{children}</form>
    </FormContext.Provider>
  );
};
