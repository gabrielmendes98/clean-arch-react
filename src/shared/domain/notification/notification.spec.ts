import { Notification } from './notification';

describe('Unit testss for notifications', () => {
  it('should create errors', () => {
    const notification = new Notification();
    notification.addError('name', 'error message');
    expect(notification.messages()).toBe('error message');

    notification.addError('price', 'error message2');
    expect(notification.messages()).toBe('error message, error message2');
  });

  it('should check if notification has at least one error', () => {
    const notification = new Notification();
    notification.addError('error', 'error message');
    expect(notification.hasErrors()).toBe(true);
  });

  it('should get all errors props', () => {
    const notification = new Notification();
    notification.addError('error', 'error message');
    expect(notification.errors).toEqual({
      error: ['error message'],
    });
  });
});
