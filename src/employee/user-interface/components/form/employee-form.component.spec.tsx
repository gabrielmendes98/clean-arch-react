import { useEmployeeForm } from 'employee/infra/adapters/employee-form.adapter';
import { FormProvider } from 'shared/infra/providers/form.provider';
import { render, screen } from 'shared/testing/test-utils';
import { EmployeeForm } from './employee-form.component';

describe('EmployeeForm', () => {
  it('should render all inputs and submit button', () => {
    const Component = () => {
      const employeeForm = useEmployeeForm();
      return (
        <FormProvider
          onSubmit={jest.fn()}
          initialValues={employeeForm.initialValues}
        >
          <EmployeeForm />
        </FormProvider>
      );
    };
    render(<Component />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/salário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cpf\/cnpj/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toHaveAttribute(
      'type',
      'submit',
    );
  });
});
