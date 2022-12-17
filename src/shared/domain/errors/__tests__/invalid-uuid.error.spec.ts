import { InvalidUuidError } from '../invalid-uuid.error';

describe('InvalidUuidError', () => {
  test('name and default message ', () => {
    const error = new InvalidUuidError();
    expect(error.name).toBe('InvalidUuidError');
    expect(error.message).toBe('ID deve ser um UUID valido');
  });

  test('custom message ', () => {
    const error = new InvalidUuidError('custom message');
    expect(error.message).toBe('custom message');
  });
});
