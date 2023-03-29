export class InvalidPasswordError extends Error {
  constructor(message?: string) {
    super(message || 'Senha inválida. Sua senha deve ter pelomenos 6 dígitos');
    this.name = 'InvalidPasswordError';
  }
}
