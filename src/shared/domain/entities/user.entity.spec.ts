import { Email } from '../value-objects/email.vo';
import { UniqueEntityId } from '../value-objects/unique-entity-id.vo';
import { User } from './user.entity';

const fakeUser = {
  email: 'someemail@gmail.com',
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  name: 'some name',
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
};

describe('User Entity', () => {
  test('constructor and getters', () => {
    const user = new User(
      new UniqueEntityId(fakeUser.id),
      new Email(fakeUser.email),
      fakeUser.token,
      fakeUser.name,
    );
    expect(user.email).toBe(fakeUser.email);
    expect(user.id).toBe(fakeUser.id);
    expect(user.name).toBe(fakeUser.name);
    expect(user.token).toBe(fakeUser.token);
  });

  test('toJSON', () => {
    const user = new User(
      new UniqueEntityId(fakeUser.id),
      new Email(fakeUser.email),
      fakeUser.token,
      fakeUser.name,
    );
    expect(user.toJSON()).toStrictEqual(fakeUser);
  });
});
