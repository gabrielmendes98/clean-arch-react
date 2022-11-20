export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || 'ID deve ser um UUID valido');
    this.name = 'InvalidUuidError';
  }
}
