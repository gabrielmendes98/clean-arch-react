import { renderHook } from 'shared/testing/test-utils';
import { useNotification } from '../use-notification.hook';

describe('useNotification', () => {
  it('should notify user without error', () => {
    const { result } = renderHook(() => useNotification());
    expect(() =>
      result.current.notify('some message', 'success'),
    ).not.toThrowError();
  });
});
