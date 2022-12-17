import { InvalidEmailError } from '../invalid-email.error';

describe('InvalidEmailError', () => {
  test('name and default message ', () => {
    const error = new InvalidEmailError();
    expect(error.name).toBe('InvalidEmailError');
    expect(error.message).toBe('Email inválido');
  });

  test('custom message ', () => {
    const error = new InvalidEmailError('custom message');
    expect(error.message).toBe('custom message');
  });
});
