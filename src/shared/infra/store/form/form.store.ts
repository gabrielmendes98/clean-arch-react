import { useContext, Context } from 'react';
import { FormContext, FormProviderData } from './form.provider';

export const useFormStore = <FormFields = object>() => {
  const context = useContext<FormProviderData<FormFields>>(
    FormContext as unknown as Context<FormProviderData<FormFields>>,
  );
  if (!context) {
    throw new Error('useFormContext must be used under FormProvider');
  }
  return context;
};
