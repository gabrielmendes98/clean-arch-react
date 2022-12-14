import { InvalidEmailError } from 'shared/domain/errors/invalid-email.error';
import { InvalidPasswordError } from 'shared/domain/errors/invalid-password.error';
import { useLoginForm } from '../login-form.adapter';

describe('useLoginForm', () => {
  test('initialValues', () => {
    expect(useLoginForm().initialValues).toStrictEqual({
      email: '',
      password: '',
    });
  });

  test('email validation ', async () => {
    expect(
      useLoginForm().validations.email('someemail@gmail.com'),
    ).toBeTruthy();
    expect(() => useLoginForm().validations.email('invalid-email')).toThrow(
      InvalidEmailError,
    );
  });

  test('password validation ', async () => {
    expect(useLoginForm().validations.password('123123')).toBeTruthy();
    expect(() => useLoginForm().validations.password('1')).toThrow(
      InvalidPasswordError,
    );
  });
});
