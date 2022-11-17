import { Form } from '../presenters/form';

export const EmployeeFormContainer = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  return <Form onSubmit={onSubmit} />;
};
