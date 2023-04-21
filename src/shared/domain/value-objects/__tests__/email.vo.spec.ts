import { NotificationError } from 'shared/domain/notification/notification.error';
import { Email } from '../email.vo';

describe('Email Value Object', () => {
  it('should validate email on constructor', () => {
    expect(() => new Email('123')).toThrow(NotificationError);
    expect(() => new Email('')).toThrow(NotificationError);
  });

  it('should not throw error on valid email', () => {
    expect(() => new Email('validemail@gmail.com')).not.toThrow(
      NotificationError,
    );
  });

  it('should set value on constructor', () => {
    const email = new Email('someemail@gmail.com');
    expect(email.value).toBe('someemail@gmail.com');
  });
});
