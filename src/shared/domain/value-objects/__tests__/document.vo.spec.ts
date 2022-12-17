import { InvalidDocumentError } from 'shared/domain/errors/invalid-document.error';
import { Document } from '../document.vo';

describe('Document Value Object', () => {
  test('constructor', () => {
    const validator = jest.spyOn(Document, 'validate');
    const document = new Document('61524210048');
    expect(validator).toHaveBeenCalledWith('61524210048');
    expect(document.value).toBe('61524210048');
  });

  test('validator success', () => {
    expect(Document.validate('61524210048')).toBeTruthy();
  });

  test('validator error', () => {
    expect(() => Document.validate('123')).toThrow(InvalidDocumentError);
  });
});
