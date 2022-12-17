import { InvalidDocumentError } from '../invalid-document.error';

describe('InvalidDocumentError', () => {
  test('name and default message ', () => {
    const error = new InvalidDocumentError();
    expect(error.name).toBe('InvalidDocumentError');
    expect(error.message).toBe('Documento deve ser um CPF ou CNPJ valido');
  });

  test('custom message ', () => {
    const error = new InvalidDocumentError('custom message');
    expect(error.message).toBe('custom message');
  });
});
