import { useContext, Context } from 'react';
import { FormContext, FormProviderData, GenericObject } from './form.store';

export const useFormContext = <FormFields extends GenericObject>() => {
  const context = useContext<FormProviderData<FormFields>>(
    FormContext as unknown as Context<FormProviderData<FormFields>>,
  );
  if (!context) {
    throw new Error('useFormContext must be used under FormProvider');
  }
  return context;
};
