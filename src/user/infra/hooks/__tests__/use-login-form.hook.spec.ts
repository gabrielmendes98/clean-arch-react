import { yup } from 'shared/domain/validator';
import { useLoginForm } from '../use-login-form.hook';

describe('useLoginForm', () => {
  test('initialValues', () => {
    expect(useLoginForm().initialValues).toStrictEqual({
      email: '',
      password: '',
    });
  });

  test('yup validations', async () => {
    expect(() => {
      yup
        .object()
        .shape({
          ...useLoginForm().validations,
        })
        .validateSync(
          {
            email: '',
            password: '',
          },
          {
            abortEarly: false,
            strict: true,
          },
        );
    }).toThrowError();
  });
});
