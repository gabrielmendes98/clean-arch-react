import {
  SignUpFormFields,
  SignUpFormService,
} from 'user/domain/interfaces/sign-up-form.interface';
import { SignUpUseCase } from 'user/use-cases/sign-up.use-case';
import { FormStorageService } from 'shared/domain/interfaces/form-storage.interface';
import { FormProvider } from 'shared/infra/providers/form/form.provider';
import { SignUpForm } from '../components/sign-up-form.component';

type Props = {
  formService: SignUpFormService;
  signUpUseCase: SignUpUseCase;
};

export const SignUpContainer = ({ formService, signUpUseCase }: Props) => {
  const { initialValues, validator } = formService;

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    { values }: FormStorageService<SignUpFormFields>,
  ) => signUpUseCase.execute(values);

  return (
    <FormProvider
      initialValues={initialValues}
      validator={validator}
      onSubmit={onSubmit}
    >
      <SignUpForm />
    </FormProvider>
  );
};
