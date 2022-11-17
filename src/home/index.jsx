import { HomeContainer } from './infra/container';
import { Employee } from 'employee/form/domain/entities/employee';

export const makeHome = () => {
  const employee = new Employee({
    name: '',
    salary: '',
    id: '',
    document: '',
    email: '',
  });

  return <HomeContainer />;
};
