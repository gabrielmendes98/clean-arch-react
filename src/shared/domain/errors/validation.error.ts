export class ValidationError extends Error {
  constructor(public errors?: string[]) {
    super('Erro de validacao');
    this.name = 'ValidationError';
  }
}
