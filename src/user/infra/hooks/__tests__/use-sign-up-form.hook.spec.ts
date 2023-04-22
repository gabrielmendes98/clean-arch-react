import { yup } from 'shared/domain/validator';
import { useSignUpForm } from '../use-sign-up-form.hook';

describe('useSignUpForm', () => {
  test('initialValues', () => {
    expect(useSignUpForm().initialValues).toStrictEqual({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  });

  test('yup validations', () => {
    expect(() => {
      yup
        .object()
        .shape({
          ...useSignUpForm().validations,
        })
        .validateSync(
          {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
          },
          {
            abortEarly: false,
            strict: true,
          },
        );
    }).toThrowError();
  });
});
