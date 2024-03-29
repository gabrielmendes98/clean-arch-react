import { useContext } from 'react';
import { UserFactory } from 'user/domain/factories/user.factory';
import { USER_STORAGE_KEY } from 'user/domain/constants/user-storage-key';
import { StoragePersistor } from 'shared/domain/interfaces/storage-persistor.interface';
import { act, renderHook } from 'shared/testing/test-utils';
import { UserContext, UserProvider } from './user.provider';

const fakeUser = {
  email: 'someemail@gmail.com',
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  name: 'some name',
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
};

const user = UserFactory.create({
  email: fakeUser.email,
  id: fakeUser.id,
  name: fakeUser.name,
  token: fakeUser.token,
});

class InMemoryPersistor implements StoragePersistor {
  constructor(public item?: any) {
    this.item = item;
  }

  set(key: string, value: any): void {
    this.item = value;
  }
  get() {
    return this.item;
  }
  delete(): void {
    this.item = null;
  }
}

describe('UserProvider', () => {
  it('should get persisted user on mount', () => {
    const persistor = new InMemoryPersistor(user);
    const wrapper = ({ children }) => (
      <UserProvider persistor={persistor}>{children}</UserProvider>
    );
    const { result } = renderHook(() => useContext(UserContext), {
      wrapper,
    });
    expect(result.current?.user).toStrictEqual(user);
  });

  it('should update user and persist', () => {
    const persistor = new InMemoryPersistor(user);
    const persistorSet = jest.spyOn(persistor, 'set');
    const wrapper = ({ children }) => (
      <UserProvider persistor={persistor}>{children}</UserProvider>
    );
    const { result } = renderHook(() => useContext(UserContext), {
      wrapper,
    });
    act(() => {
      result.current?.updateUser(null);
    });
    expect(result.current?.user).toBeNull();
    expect(persistorSet).toHaveBeenCalledWith(USER_STORAGE_KEY, undefined);
  });

  it('should remove user and persist', () => {
    const persistor = new InMemoryPersistor(user);
    const persistorDelete = jest.spyOn(persistor, 'delete');
    const wrapper = ({ children }) => (
      <UserProvider persistor={persistor}>{children}</UserProvider>
    );
    const { result } = renderHook(() => useContext(UserContext), {
      wrapper,
    });
    act(() => {
      result.current?.removeUser();
    });
    expect(result.current?.user).toBeNull();
    expect(persistorDelete).toHaveBeenCalledWith(USER_STORAGE_KEY);
  });
});
