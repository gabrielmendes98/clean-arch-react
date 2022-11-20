export class InvalidEmailError extends Error {
  constructor(message?: string) {
    super(message || 'Email invalido');
    this.name = 'InvalidEmailError';
  }
}
