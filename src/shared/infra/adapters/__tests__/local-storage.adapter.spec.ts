import { LocalStorageAdapter } from '../local-storage.adapter';

describe('LocalStorageAdapter', () => {
  test('get method', () => {
    const localStorage = new LocalStorageAdapter();
    let value = localStorage.get('some-key');
    expect(value).toBeNull();
    window.localStorage.setItem(
      'some-key',
      JSON.stringify({ value: 'some value' }),
    );
    value = localStorage.get('some-key');
    expect(value).toStrictEqual({ value: 'some value' });
  });

  test('delete method', () => {
    window.localStorage.setItem(
      'some-key',
      JSON.stringify({ value: 'some value' }),
    );
    const localStorage = new LocalStorageAdapter();
    localStorage.delete('some-key');
    expect(window.localStorage.getItem('some-key')).toBeNull();
  });

  test('set method', () => {
    const localStorage = new LocalStorageAdapter();
    localStorage.set('some-key', { value: 'value' });
    expect(window.localStorage.getItem('some-key')).toBe(
      JSON.stringify({
        value: 'value',
      }),
    );
    localStorage.set('some-key', false);
    expect(window.localStorage.getItem('some-key')).toBeNull();
  });
});
