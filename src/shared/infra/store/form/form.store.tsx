import { createContext, useState, FormEvent, PropsWithChildren } from 'react';

export type GenericObject = {
  [key: string]: any;
};

export type FormProviderData<InitialValues extends GenericObject> = {
  values: InitialValues;
  onChangeField: (name: string, value: any) => void;
};

export const FormContext =
  createContext<FormProviderData<GenericObject> | null>(null);

type Props<InitialValues extends GenericObject> = {
  initialValues: InitialValues;
  onSubmit: (e: FormEvent<HTMLFormElement>, values: InitialValues) => void;
};

export const FormProvider = <InitialValues extends GenericObject>({
  initialValues,
  children,
  onSubmit,
}: PropsWithChildren<Props<InitialValues>>) => {
  const [values, setValues] = useState<InitialValues>(initialValues);

  const onChangeField = (name: string, value: any) => {
    setValues(init => ({
      ...init,
      [name]: value,
    }));
  };

  const _onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e, values);
  };

  return (
    <FormContext.Provider value={{ values, onChangeField }}>
      <form onSubmit={_onSubmit}>{children}</form>
    </FormContext.Provider>
  );
};
