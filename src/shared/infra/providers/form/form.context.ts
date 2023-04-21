import { createContext } from 'react';
import { FormStorageService } from 'shared/domain/interfaces/form-storage.interface';

export const FormContext = createContext<FormStorageService<object> | null>(
  null,
);
