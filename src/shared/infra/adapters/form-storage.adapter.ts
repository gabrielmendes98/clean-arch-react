import { useContext, Context } from 'react';
import { FormStorageService } from 'shared/application/form-storage.port';
import { FormContext } from '../providers/form.provider';

export const useFormStorage = <FormFields = object>() => {
  const context = useContext<FormStorageService<FormFields>>(
    FormContext as unknown as Context<FormStorageService<FormFields>>,
  );
  if (!context) {
    throw new Error('useFormStorage must be used under FormProvider');
  }
  return context;
};
