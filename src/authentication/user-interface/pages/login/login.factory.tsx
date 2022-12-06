import { LoginFormService } from 'authentication/application/ports/login-form.port';
import { useLoginForm } from 'authentication/infra/adapters/login-form.adapter';
import { LoginView } from './views/login.view';

export const MakeLoginPage = () => {
  const formService: LoginFormService = useLoginForm();

  return <LoginView formService={formService} />;
};
