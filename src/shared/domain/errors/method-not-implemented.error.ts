export class MethodNotImplementedError extends Error {
  constructor() {
    super('Método não implementado');
    this.name = 'MethodNotImplementedError';
  }
}
