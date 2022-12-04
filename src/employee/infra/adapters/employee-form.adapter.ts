import { useCallback } from 'react';
import {
  EmployeeFormService,
  EmployeeFormFields,
} from 'employee/application/ports/employee-form.port';
import { Employee } from 'employee/domain/entities/employee.entity';

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

  const parseEntityToValues = useCallback(
    (employee: Employee) => ({
      name: employee.name,
      email: employee.email,
      document: employee.document,
      salary: String(employee.salary),
    }),
    [],
  );

  return {
    initialValues,
    parseValuesToInput,
    parseEntityToValues,
  };
};
