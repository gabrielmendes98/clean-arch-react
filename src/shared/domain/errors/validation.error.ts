export class ValidationError extends Error {
  constructor(public errors?: string[]) {
    super('Attribute validation error');
    this.name = 'ValidationError';
  }
}
