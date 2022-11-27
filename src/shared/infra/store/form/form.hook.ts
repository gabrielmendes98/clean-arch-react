import { useContext, Context } from 'react';
import { FormContext, FormProviderData, GenericObject } from './form.store';

export const useFormContext = <InitialValues extends GenericObject>() => {
  const context = useContext<FormProviderData<InitialValues>>(
    FormContext as unknown as Context<FormProviderData<InitialValues>>,
  );
  if (!context) {
    throw new Error('useFormContext must be used under FormProvider');
  }
  return context;
};
