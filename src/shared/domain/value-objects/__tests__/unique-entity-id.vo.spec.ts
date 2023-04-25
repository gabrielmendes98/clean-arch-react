import { NotificationError } from 'shared/domain/notification/notification.error';
import { UniqueEntityId } from '../unique-entity-id.vo';

describe('UniqueEntityId Value Object', () => {
  describe('invalid cases', () => {
    it('should request valid id format', () => {
      const id = new UniqueEntityId('123');
      expect(id.notification.hasErrors()).toBe(true);
      expect(id.notification.errors).toEqual({
        id: ['ID deve ser um UUID válido'],
      });
      expect(id.isValid()).toBe(false);
      expect(id.value).toBe('123');
      expect(id.errors).toEqual({
        id: ['ID deve ser um UUID válido'],
      });
    });

    it('should request id as mandatory', () => {
      const id = new UniqueEntityId('');
      expect(id.notification.hasErrors()).toBe(true);
      expect(id.notification.errors).toEqual({
        id: ['id é obrigatório', 'ID deve ser um UUID válido'],
      });
      expect(id.isValid()).toBe(false);
      expect(id.value).toBe('');
      expect(id.errors).toEqual({
        id: ['id é obrigatório', 'ID deve ser um UUID válido'],
      });
    });
  });

  it('should create valid uuid', () => {
    const id = new UniqueEntityId('b2e4d4d0-4b9c-4d4b-9f4c-0c4d4d4d4d4d');
    expect(id.notification.hasErrors()).toBe(false);
    expect(id.notification.errors).toEqual({});
    expect(id.isValid()).toBe(true);
    expect(id.value).toBe('b2e4d4d0-4b9c-4d4b-9f4c-0c4d4d4d4d4d');
    expect(id.errors).toBeNull();
  });
});
