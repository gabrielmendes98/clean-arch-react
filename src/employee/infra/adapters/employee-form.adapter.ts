import { useCallback } from 'react';
import {
  EmployeeFormService,
  EmployeeFormFields,
} from 'employee/application/ports/employee-form.port';

export const useEmployeeForm = (): EmployeeFormService => {
  const initialValues = {
    name: '',
    email: '',
    document: '',
    salary: '',
  };

  const parseValuesToInput = useCallback(
    (formFields: EmployeeFormFields) => ({
      name: formFields.name,
      email: formFields.email,
      document: formFields.document,
      salary: Number(formFields.salary),
    }),
    [],
  );

  return {
    initialValues,
    parseValuesToInput,
  };
};
