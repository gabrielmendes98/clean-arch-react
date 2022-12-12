import {
  SignUpFormFields,
  SignUpFormService,
} from 'authentication/application/ports/sign-up-form.port';
import { SignUpUseCase } from 'authentication/application/use-cases/sign-up.use-case';
import { SignUpForm } from 'authentication/user-interface/components/sign-up-form/sign-up-form.component';
import { FormStorageService } from 'shared/application/form-storage.port';
import { FormProvider } from 'shared/infra/providers/form.provider';

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
