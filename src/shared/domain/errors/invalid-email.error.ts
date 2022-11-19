export class InvalidEmailError extends Error {
  constructor(message?: string) {
    super(message || 'Email must be valid');
    this.name = 'InvalidEmailError';
  }
}
