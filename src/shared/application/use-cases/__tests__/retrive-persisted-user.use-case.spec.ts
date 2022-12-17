import { StoragePersistor } from 'shared/application/storage-persistor.port';
import { PersistedUser } from 'shared/application/user-storage.port';
import { User } from 'shared/domain/entities/user.entity';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { userStorageServiceMock } from 'shared/testing/mocks/user-storage.mock';
import { RetrivePersistedUserUseCase } from '../retrive-persisted-user.use-case';

const fakeStoragePersistor: StoragePersistor<PersistedUser> = {
  delete: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
};

const fakeUser = {
  email: 'someemail@gmail.com',
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  name: 'some name',
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
};

describe('RetrivePersistedUserUseCase', () => {
  it('should get persisted user and update in-memory user', () => {
    jest.spyOn(fakeStoragePersistor, 'get').mockReturnValue(fakeUser);
    const useCase = new RetrivePersistedUserUseCase(
      fakeStoragePersistor,
      userStorageServiceMock,
    );
    useCase.execute();
    expect(userStorageServiceMock.updateUser).toHaveBeenCalledWith(
      new User(
        new UniqueEntityId(fakeUser.id),
        new Email(fakeUser.email),
        fakeUser.token,
        fakeUser.name,
      ),
    );
  });

  it('should update user with null value when do not have user', () => {
    jest.spyOn(fakeStoragePersistor, 'get').mockReturnValue(null);
    const useCase = new RetrivePersistedUserUseCase(
      fakeStoragePersistor,
      userStorageServiceMock,
    );
    useCase.execute();
    expect(userStorageServiceMock.updateUser).toHaveBeenCalledWith(null);
  });
});