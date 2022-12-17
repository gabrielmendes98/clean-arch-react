import { InvalidEmailError } from 'shared/domain/errors/invalid-email.error';
import { Email } from '../email.vo';

describe('Email Value Object', () => {
  test('constructor', () => {
    const validator = jest.spyOn(Email, 'validate');
    const email = new Email('valid@email.com');
    expect(validator).toHaveBeenCalledWith('valid@email.com');
    expect(email.value).toBe('valid@email.com');
  });

  test('validator success', () => {
    expect(Email.validate('valid@email.com')).toBeTruthy();
  });

  test('validator error', () => {
    expect(() => Email.validate('123')).toThrow(InvalidEmailError);
  });
});
