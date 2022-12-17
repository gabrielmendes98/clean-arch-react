import { MethodNotImplementedError } from '../method-not-implemented.error';

describe('MethodNotImplementedError', () => {
  test('name and default message ', () => {
    const error = new MethodNotImplementedError();
    expect(error.name).toBe('MethodNotImplementedError');
    expect(error.message).toBe('Método não implementado');
  });

  test('custom message ', () => {
    const error = new MethodNotImplementedError('custom message');
    expect(error.message).toBe('custom message');
  });
});
