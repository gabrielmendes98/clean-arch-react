import {
  createContext,
  useState,
  FormEvent,
  PropsWithChildren,
  useCallback,
} from 'react';

export type GenericObject = {
  [key: string]: any;
};

export type FormProviderData<InitialValues extends GenericObject> = {
  values: InitialValues;
  onChangeField: (name: string, value: any) => void;
  resetForm: () => void;
};

export const FormContext =
  createContext<FormProviderData<GenericObject> | null>(null);

type Props<InitialValues extends GenericObject> = {
  initialValues: InitialValues;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    formBag: FormProviderData<InitialValues>,
  ) => void;
};

export const FormProvider = <InitialValues extends GenericObject>({
  initialValues,
  children,
  onSubmit,
}: PropsWithChildren<Props<InitialValues>>) => {
  const [values, setValues] = useState<InitialValues>(initialValues);

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

  const _onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e, { values, onChangeField, resetForm });
  };

  return (
    <FormContext.Provider value={{ values, onChangeField, resetForm }}>
      <form onSubmit={_onSubmit}>{children}</form>
    </FormContext.Provider>
  );
};
