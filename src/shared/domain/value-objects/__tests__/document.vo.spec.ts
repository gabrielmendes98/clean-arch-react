import { NotificationError } from 'shared/domain/notification/notification.error';
import { Document } from '../document.vo';

describe('Document Value Object', () => {
  it('should validate email on constructor', () => {
    expect(() => new Document('123')).toThrow(NotificationError);
    expect(() => new Document('')).toThrow(NotificationError);
    expect(() => new Document('00000000000')).toThrow(NotificationError);
    expect(() => new Document('00000000000000')).toThrow(NotificationError);
  });

  it('should accept different document formats on constructor', () => {
    expect(() => new Document('61524210048')).not.toThrow(NotificationError);
    expect(() => new Document('085.679.886-08')).not.toThrow(NotificationError);
    expect(() => new Document('085.679.886.08')).not.toThrow(NotificationError);
    expect(() => new Document('14.588.843/0001-65')).not.toThrow(
      NotificationError,
    );
    expect(() => new Document('14588843000165')).not.toThrow(NotificationError);
  });

  it('should set value on constructor', () => {
    const document = new Document('61524210048');
    expect(document.value).toBe('61524210048');
  });
});
