import { Email } from '../email.vo';

describe('Email Value Object', () => {
  describe('should validate email on constructor', () => {
    test.each([['someemail'], ['someemail@'], ['someemail@gmail']])(
      'when value is %s',
      value => {
        const email = new Email(value);
        expect(email.notification.hasErrors()).toBe(true);
        expect(email.notification.errors).toEqual({
          email: ['Email deve ser um e-mail válido'],
        });
        expect(email.isValid()).toBe(false);
        expect(email.value).toBe(value);
        expect(email.notification.errors).toEqual({
          email: ['Email deve ser um e-mail válido'],
        });
      },
    );

    it('should be invalid when value is empty string', () => {
      const email = new Email('');
      expect(email.notification.hasErrors()).toBe(true);
      expect(email.notification.errors).toEqual({
        email: ['Email é obrigatório'],
      });
      expect(email.isValid()).toBe(false);
      expect(email.value).toBe('');
      expect(email.errors).toEqual({
        email: ['Email é obrigatório'],
      });
    });
  });

  it('should accept valid email on constructor', () => {
    const email = new Email('validemail@gmail.com');
    expect(email.value).toBe('validemail@gmail.com');
    expect(email.isValid()).toBe(true);
    expect(email.notification.hasErrors()).toBe(false);
    expect(email.notification.errors).toEqual({});
    expect(email.errors).toBeNull();
  });
});
