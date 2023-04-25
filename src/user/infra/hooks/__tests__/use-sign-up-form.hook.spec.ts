import { renderHook } from 'shared/testing/test-utils';
import { useSignUpForm } from '../use-sign-up-form.hook';

describe('useSignUpForm', () => {
  it('should return correct initialValues', () => {
    const { result } = renderHook(() => useSignUpForm());
    expect(result.current.initialValues).toStrictEqual({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  });

  describe('validator', () => {
    it('should return null when no errors', () => {
      const { result } = renderHook(() => useSignUpForm());
      const values = {
        name: 'validname',
        email: 'validemail@gmail.com',
        password: 'validpassword',
        confirmPassword: 'validpassword',
      };
      expect(result.current.validator(values)).toBeNull();
    });

    it('should return errors when name is invalid', () => {
      const { result } = renderHook(() => useSignUpForm());
      const values = {
        name: '',
        email: 'validemail@gmail.com',
        password: 'validpassword',
        confirmPassword: 'validpassword',
      };
      expect(result.current.validator(values)).toStrictEqual({
        name: ['Nome deve ter pelo menos 3 caracteres', 'Nome é obrigatório'],
      });
    });

    it('should return errors when email is invalid', () => {
      const { result } = renderHook(() => useSignUpForm());
      const values = {
        name: 'validname',
        email: 'invalidemail',
        password: 'validpassword',
        confirmPassword: 'validpassword',
      };
      expect(result.current.validator(values)).toStrictEqual({
        email: ['Email deve ser um e-mail válido'],
      });
    });

    it('should return errors when password is invalid', () => {
      const { result } = renderHook(() => useSignUpForm());
      const values = {
        name: 'validname',
        email: 'validemail@gmail.com',
        password: '123',
        confirmPassword: '123',
      };
      expect(result.current.validator(values)).toStrictEqual({
        confirmPassword: ['Senha deve ter pelo menos 6 caracteres'],
        password: ['Senha deve ter pelo menos 6 caracteres'],
      });
    });

    it('should return errors when passwords not match', () => {
      const { result } = renderHook(() => useSignUpForm());
      const values = {
        name: 'validname',
        email: 'validemail@gmail.com',
        password: 'validpassword',
        confirmPassword: 'notmatchpassword',
      };
      expect(result.current.validator(values)).toStrictEqual({
        confirmPassword: ['As senhas devem ser iguais'],
      });
    });
  });
});
