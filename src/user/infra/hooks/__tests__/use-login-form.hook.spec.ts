import { renderHook } from 'shared/testing/test-utils';
import { useLoginForm } from '../use-login-form.hook';

describe('useLoginForm', () => {
  it('should return correct initialValues', () => {
    const { result } = renderHook(() => useLoginForm());
    expect(result.current.initialValues).toStrictEqual({
      email: '',
      password: '',
    });
  });

  describe('validator', () => {
    it('should return null when no errors', () => {
      const { result } = renderHook(() => useLoginForm());
      const values = {
        email: 'validemail@gmail.com',
        password: 'validpassword',
      };
      expect(result.current.validator(values)).toBeNull();
    });

    it('should return errors when email is invalid', () => {
      const { result } = renderHook(() => useLoginForm());
      const values = {
        email: 'invalidemail',
        password: 'validpassword',
      };
      expect(result.current.validator(values)).toStrictEqual({
        email: ['Email deve ser um e-mail válido'],
      });
    });

    it('should return errors when password is invalid', () => {
      const { result } = renderHook(() => useLoginForm());
      const values = {
        email: 'validEmail@gmail.com',
        password: '123',
      };
      expect(result.current.validator(values)).toStrictEqual({
        password: ['Senha deve ter pelo menos 6 caracteres'],
      });
    });

    it('should return errors when email and password are invalid', () => {
      const { result } = renderHook(() => useLoginForm());
      const values = {
        email: 'invalidemail',
        password: '123',
      };
      expect(result.current.validator(values)).toStrictEqual({
        email: ['Email deve ser um e-mail válido'],
        password: ['Senha deve ter pelo menos 6 caracteres'],
      });
    });
  });
});
