import { InvalidPasswordError } from 'shared/domain/errors/invalid-password.error';
import { Password } from '../password.vo';

describe('Password Value Object', () => {
  test('constructor', () => {
    const validator = jest.spyOn(Password, 'validate');
    const password = new Password('123456');
    expect(validator).toHaveBeenCalledWith('123456');
    expect(password.value).toBe('123456');
  });

  test('validator success', () => {
    expect(Password.validate('123456')).toBeTruthy();
  });

  test('validator error', () => {
    expect(() => Password.validate('123')).toThrow(InvalidPasswordError);
  });
});
