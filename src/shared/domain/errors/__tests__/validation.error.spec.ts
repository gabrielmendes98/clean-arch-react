import { EntityValidationError, ValidationError } from '../validation.error';

describe('ValidationError', () => {
  test('name, message and default errors', () => {
    const error = new ValidationError();
    expect(error.name).toBe('ValidationError');
    expect(error.message).toBe('Erro de validação');
    expect(error.errors).toBe(undefined);
  });

  test('custom errors', () => {
    const error = new ValidationError(['error1', 'error2']);
    expect(error.errors).toStrictEqual(['error1', 'error2']);
  });
});

describe('EntityValidationError', () => {
  test('name, message and default errors', () => {
    const error = new EntityValidationError();
    expect(error.name).toBe('EntityValidationError');
    expect(error.message).toBe('Erro de validação de entidade');
    expect(error.errors).toStrictEqual({});
  });

  test('custom errors', () => {
    const error = new EntityValidationError({
      attr1: ['some error', 'other error'],
      attr2: ['error 3'],
    });
    expect(error.errors).toStrictEqual({
      attr1: ['some error', 'other error'],
      attr2: ['error 3'],
    });
  });
});
