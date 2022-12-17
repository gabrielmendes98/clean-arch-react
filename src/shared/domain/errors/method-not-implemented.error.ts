export class MethodNotImplementedError extends Error {
  constructor(message?: string) {
    super(message || 'Método não implementado');
    this.name = 'MethodNotImplementedError';
  }
}
