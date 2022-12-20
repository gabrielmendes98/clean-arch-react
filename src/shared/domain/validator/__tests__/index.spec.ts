import {
  EntityValidationError,
  ValidationError,
} from 'shared/domain/errors/validation.error';
import { validator } from '..';

describe('validator', () => {
  describe('validateAttribute', () => {
    test('success', () => {
      const isValid = validator
        .string()
        .required()
        .validateAttribute('some name', 'Nome');
      expect(isValid).toBeTruthy();
    });

    test('success without label', () => {
      const isValid = validator
        .string()
        .required()
        .validateAttribute('some name');
      expect(isValid).toBeTruthy();
    });

    test('error', () => {
      expect.assertions(2);
      try {
        validator.string().required().validateAttribute(22, 'Nome');
      } catch (e: any) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(e.errors).toStrictEqual([
          'Nome deve ser do tipo `string`, mas o valor final é: `22`',
        ]);
      }
    });
  });

  describe('entityValidationSchema', () => {
    test('success', () => {
      const isValid = validator
        .entityValidationSchema({
          name: (value: string) =>
            validator.string().required().isValidSync(value),
          salary: (value: number) =>
            validator.number().required().isValidSync(value),
        })
        .validate({
          name: 'some name',
          salary: 22,
        });
      expect(isValid).toBeTruthy();
    });

    test('error', () => {
      expect.assertions(2);
      try {
        validator
          .entityValidationSchema({
            name: (value: string) =>
              validator.string().required().validateAttribute(value, 'Nome'),
            salary: (value: number) =>
              validator.number().required().validateAttribute(value, 'Salário'),
          })
          .validate({
            name: 22,
            salary: 'some name',
          });
      } catch (e: any) {
        expect(e).toBeInstanceOf(EntityValidationError);
        expect(e.errors).toStrictEqual({
          name: ['Nome deve ser do tipo `string`, mas o valor final é: `22`'],
          salary: [
            'Salário deve ser do tipo `number`, mas o valor final é: `"some name"`',
          ],
        });
      }
    });
  });
});
