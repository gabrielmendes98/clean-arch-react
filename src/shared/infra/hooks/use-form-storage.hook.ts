import { useContext, Context } from 'react';
import { FormStorageService } from 'shared/domain/interfaces/form-storage.interface';
import { FormContext } from '../providers/form/form.context';

export const useFormStorage = <FormFields = object>() => {
  const context = useContext<FormStorageService<FormFields>>(
    FormContext as unknown as Context<FormStorageService<FormFields>>,
  );
  if (!context) {
    throw new Error('useFormStorage must be used under FormProvider');
  }
  return context;
};
