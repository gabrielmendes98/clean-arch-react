import {
  SignUpFormFields,
  SignUpFormService,
} from 'authentication/domain/interfaces/sign-up-form.interface';
import { SignUpUseCase } from 'authentication/use-cases/sign-up.use-case';
import { FormStorageService } from 'shared/domain/interfaces/form-storage.interface';
import { FormProvider } from 'shared/infra/providers/form.provider';
import { SignUpForm } from '../components/sign-up-form.component';

type Props = {
  formService: SignUpFormService;
  signUpUseCase: SignUpUseCase;
};

export const SignUpView = ({ formService, signUpUseCase }: Props) => {
  const { initialValues, validations } = formService;

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    { values }: FormStorageService<SignUpFormFields>,
  ) => {
    await signUpUseCase.execute(values);
  };

  return (
    <FormProvider
      initialValues={initialValues}
      validations={validations}
      onSubmit={onSubmit}
    >
      <SignUpForm />
    </FormProvider>
  );
};
