import { InvalidPasswordError } from 'authentication/domain/errors/invalid-password.error';
import { InvalidEmailError } from 'shared/domain/errors/invalid-email.error';
import { ValidationError } from 'shared/domain/errors/validation.error';
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

  test('email validation ', async () => {
    expect(
      useSignUpForm().validations.email('someemail@gmail.com'),
    ).toBeTruthy();
    expect(() => useSignUpForm().validations.email('invalid-email')).toThrow(
      InvalidEmailError,
    );
  });

  test('password validation ', async () => {
    expect(useSignUpForm().validations.password('123123')).toBeTruthy();
    expect(() => useSignUpForm().validations.password('1')).toThrow(
      InvalidPasswordError,
    );
  });

  test('confirmPassword validation ', async () => {
    expect(useSignUpForm().validations.confirmPassword('123123')).toBeTruthy();
    expect(() => useSignUpForm().validations.confirmPassword('1')).toThrow(
      InvalidPasswordError,
    );
  });

  test('name validation ', async () => {
    expect(useSignUpForm().validations.name('some name')).toBeTruthy();
    expect(() => useSignUpForm().validations.name('')).toThrow(ValidationError);
  });
});
