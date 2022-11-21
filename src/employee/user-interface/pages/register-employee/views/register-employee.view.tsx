import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import { Form } from '../../../components/form/employee-form.component';

type Props = {
  registerEmployeeUseCase: RegisterEmployeeUseCase;
};

export const RegisterEmployeeMainComponent = ({
  registerEmployeeUseCase,
}: Props) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = {
        name: '',
        email: '',
        document: '',
        salary: 0,
      };
      registerEmployeeUseCase.execute(formData);
    } catch (e) {
      console.log(e);
    }
  };

  return <Form onSubmit={onSubmit} />;
};
