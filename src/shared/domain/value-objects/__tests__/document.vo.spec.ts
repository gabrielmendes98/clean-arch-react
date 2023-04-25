import { Document } from '../document.vo';

describe('Document Value Object', () => {
  describe('should validate document on constructor', () => {
    test.each([['123'], [''], ['00000000000'], ['00000000000000']])(
      'when value is %s',
      value => {
        const document = new Document(value);
        expect(document.notification.hasErrors()).toBe(true);
        expect(document.notification.errors).toEqual({
          document: ['Documento deve ser um CPF ou CNPJ valido'],
        });
        expect(document.isValid()).toBe(false);
        expect(document.value).toBe(value);
        expect(document.notification.errors).toEqual({
          document: ['Documento deve ser um CPF ou CNPJ valido'],
        });
      },
    );
  });

  describe('should accept different document formats on constructor', () => {
    test.each([
      ['61524210048'],
      ['085.679.886-08'],
      ['085.679.886.08'],
      ['14.588.843/0001-65'],
      ['14588843000165'],
    ])('when value is %s', value => {
      const document = new Document(value);
      expect(document.value).toBe(value);
      expect(document.isValid()).toBe(true);
      expect(document.notification.hasErrors()).toBe(false);
      expect(document.notification.errors).toEqual({});
      expect(document.errors).toBeNull();
    });
  });
});
