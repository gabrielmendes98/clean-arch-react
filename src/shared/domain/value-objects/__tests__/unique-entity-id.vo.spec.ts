import { NotificationError } from 'shared/domain/notification/notification.error';
import { UniqueEntityId } from '../unique-entity-id.vo';

describe('UniqueEntityId Value Object', () => {
  it('should validate uuid on constructor', () => {
    expect(() => new UniqueEntityId('123')).toThrow(NotificationError);
    expect(() => new UniqueEntityId('')).toThrow(NotificationError);
  });

  it('should not throw error on valid uuid', () => {
    expect(
      () => new UniqueEntityId('b2e4d4d0-4b9c-4d4b-9f4c-0c4d4d4d4d4d'),
    ).not.toThrow(NotificationError);
  });

  it('should set value on constructor', () => {
    const uuid = new UniqueEntityId('b2e4d4d0-4b9c-4d4b-9f4c-0c4d4d4d4d4d');
    expect(uuid.value).toBe('b2e4d4d0-4b9c-4d4b-9f4c-0c4d4d4d4d4d');
  });
});
