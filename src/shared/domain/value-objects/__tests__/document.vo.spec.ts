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
    expect(Document.validate('085.679.886-08')).toBeTruthy();
    expect(Document.validate('085.679.886.08')).toBeTruthy();
    expect(Document.validate('14.588.843/0001-65')).toBeTruthy();
    expect(Document.validate('14588843000165')).toBeTruthy();
  });

  test('validator error', () => {
    expect(() => Document.validate('123')).toThrow(InvalidDocumentError);
    expect(() => Document.validate('')).toThrow(InvalidDocumentError);
    expect(() => Document.validate('00000000000')).toThrow(
      InvalidDocumentError,
    );
    expect(() => Document.validate('00000000000000')).toThrow(
      InvalidDocumentError,
    );
  });
});
