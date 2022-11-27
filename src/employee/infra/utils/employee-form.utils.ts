import { Input } from 'employee/application/use-cases/register-employee.use-case';

export interface FormData {
  name: string;
  email: string;
  document: string;
  salary: string;
}

export const initialValues: FormData = {
  name: '',
  email: '',
  document: '',
  salary: '',
};

export const parseFormToInput = (formData: FormData): Input => ({
  name: formData.name,
  email: formData.email,
  document: formData.document,
  salary: Number(formData.salary),
});
