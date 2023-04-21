import { useCallback } from 'react';
import { Employee } from 'employee/domain/entities/employee.entity';
import {
  EmployeeFormFields,
  EmployeeFormService,
} from 'employee/domain/interfaces/employee-form.interface';
import { employeeYupValidations } from 'employee/domain/validator/employee.yup.validator';
import { emailYupValidations } from 'shared/domain/validator/value-object-validators/email.yup.validator';
import { documentYupValidations } from 'shared/domain/validator/value-object-validators/document.yup.validator';

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

  const validations = {
    name: employeeYupValidations.name,
    salary: employeeYupValidations.salary,
    email: emailYupValidations.email,
    document: documentYupValidations.document,
  };

  return {
    initialValues,
    parseValuesToInput,
    parseEntityToValues,
    validations,
  };
};
