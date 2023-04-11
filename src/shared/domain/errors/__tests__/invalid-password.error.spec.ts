import { InvalidPasswordError } from '../../../../authentication/domain/errors/invalid-password.error';

describe('InvalidPasswordError', () => {
  test('name and default message ', () => {
    const error = new InvalidPasswordError();
    expect(error.name).toBe('InvalidPasswordError');
    expect(error.message).toBe(
      'Senha inválida. Sua senha deve ter pelomenos 6 dígitos',
    );
  });

  test('custom message ', () => {
    const error = new InvalidPasswordError('custom message');
    expect(error.message).toBe('custom message');
  });
});
