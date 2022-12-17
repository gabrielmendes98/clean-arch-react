import { ValueObject } from '../value-object';

class StubValueObject extends ValueObject<any> {}

describe('Base Value Object', () => {
  test('constructor', () => {
    const vo = new StubValueObject(22);
    expect(vo.value).toBe(22);
    expect(vo.toString()).toBe('22');
  });

  test('constructor with object', () => {
    const vo = new StubValueObject({ name: 'some name' });
    expect(vo.value).toStrictEqual({ name: 'some name' });
    expect(vo.toString()).toBe('{"name":"some name"}');
  });
});
