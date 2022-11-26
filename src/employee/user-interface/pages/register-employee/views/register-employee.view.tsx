import { RegisterEmployeeUseCase } from 'employee/application/use-cases/register-employee.use-case';
import { Form } from '../../../components/form/employee-form.component';

type Props = {
  registerEmployeeUseCase: RegisterEmployeeUseCase;
};

export const RegisterEmployeeMainComponent = ({
  registerEmployeeUseCase,
}: Props) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = {
        name: 'gabriel',
        email: 'gabriel@gmail.com',
        document: '08567988608',
        salary: 21,
      };
      await registerEmployeeUseCase.execute(formData);
      console.log('sucesso');
    } catch (e) {
      console.log('caiu aqui');
      console.log(JSON.parse(JSON.stringify(e)));
    }
  };

  return <Form onSubmit={onSubmit} />;
};
