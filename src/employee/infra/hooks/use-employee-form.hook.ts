import { useCallback } from 'react';
import { Employee } from 'employee/domain/entities/employee.entity';
import {
  EmployeeFormFields,
  EmployeeFormService,
} from 'employee/domain/interfaces/employee-form.interface';

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
