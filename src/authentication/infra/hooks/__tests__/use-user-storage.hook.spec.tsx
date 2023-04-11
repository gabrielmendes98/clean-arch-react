import { UserProvider } from 'authentication/infra/providers/user.provider';
import { storagePersistorMock } from 'shared/testing/mocks/persistor.mock';
import { renderHook } from 'shared/testing/test-utils';
import { useUserStorage } from '../use-user-storage.hook';

describe('useUserStorage', () => {
  it('should return all provider values', () => {
    const wrapper = ({ children }) => (
      <UserProvider persistor={storagePersistorMock}>{children}</UserProvider>
    );
    const { result } = renderHook(() => useUserStorage(), { wrapper });
    expect(result.current.removeUser).toBeDefined();
    expect(result.current.updateUser).toBeDefined();
    expect(result.current.user).toBeDefined();
  });

  it('should throw error when use service without provider', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    expect(() => renderHook(() => useUserStorage())).toThrowError(
      'useUserStorage must be used under UserContext',
    );
  });
});
