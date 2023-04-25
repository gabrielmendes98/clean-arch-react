import { useCallback } from 'react';
import { Employee } from 'employee/domain/entities/employee.entity';
import {
  EmployeeFormFields,
  EmployeeFormService,
} from 'employee/domain/interfaces/employee-form.interface';
import { EmployeeFactory } from 'employee/domain/factories/employee.factory';

export const useEmployeeForm = (): EmployeeFormService => {
  const initialValues: EmployeeFormFields = {
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

  const validator = useCallback((formFields: EmployeeFormFields) => {
    const employee = EmployeeFactory.create({
      name: formFields.name,
      email: formFields.email,
      document: formFields.document,
      salary: Number(formFields.salary),
    });
    return employee.errors;
  }, []);

  return {
    initialValues,
    parseValuesToInput,
    parseEntityToValues,
    validator,
  };
};
