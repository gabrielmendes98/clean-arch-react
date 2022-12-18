import { renderHook, screen } from 'shared/testing/test-utils';
import { useNotification } from '../notification.adapter';

describe('useNotification', () => {
  it('should notify user without error', () => {
    const { result } = renderHook(() => useNotification());
    expect(() =>
      result.current.notify('some message', 'success'),
    ).not.toThrowError();
  });
});
