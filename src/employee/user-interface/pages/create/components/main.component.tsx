import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import { Form } from '../../../components/form/form.component';

type Props = {
  registerEmployeeUseCase: RegisterEmployeeUseCase;
};

export const RegisterEmployeeMainComponent = ({
  registerEmployeeUseCase,
}: Props) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name: '',
      email: '',
      document: '',
      salary: 0,
    };
    registerEmployeeUseCase.execute(formData);
  };

  return <Form onSubmit={onSubmit} />;
};
