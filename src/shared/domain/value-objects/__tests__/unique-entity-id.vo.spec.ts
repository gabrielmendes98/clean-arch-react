import { InvalidUuidError } from 'shared/domain/errors/invalid-uuid.error';
import { UniqueEntityId } from '../unique-entity-id.vo';

describe('UniqueEntityId Value Object', () => {
  test('constructor', () => {
    const validator = jest.spyOn(UniqueEntityId, 'validate');
    const uuid = new UniqueEntityId('b4167d0c-b441-425e-817c-0a702f2c9a01');
    expect(validator).toHaveBeenCalledWith(
      'b4167d0c-b441-425e-817c-0a702f2c9a01',
    );
    expect(uuid.value).toBe('b4167d0c-b441-425e-817c-0a702f2c9a01');
  });

  test('validator success', () => {
    expect(
      UniqueEntityId.validate('b4167d0c-b441-425e-817c-0a702f2c9a01'),
    ).toBeTruthy();
  });

  test('validator error', () => {
    expect(() => UniqueEntityId.validate('123')).toThrow(InvalidUuidError);
  });
});
