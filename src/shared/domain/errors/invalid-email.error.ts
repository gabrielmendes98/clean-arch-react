export class InvalidEmailError extends Error {
  constructor(message?: string) {
    super(message || 'Email inválido');
    this.name = 'InvalidEmailError';
  }
}
