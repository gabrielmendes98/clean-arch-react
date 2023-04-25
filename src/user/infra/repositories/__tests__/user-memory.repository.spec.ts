import { UserFactory } from 'user/domain/factories/user.factory';
import { UserMemoryRepository } from '../user-memory.repository';

const user = UserFactory.create({
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
  email: 'fakeemail@gmail.com',
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  name: 'Gabriel',
});

describe('userMemoryRepository', () => {
  it('should return correct response when call login method', async () => {
    const repository = new UserMemoryRepository();
    expect(await repository.get()).toStrictEqual(user);
  });

  it('should return correct response when call signUp method', async () => {
    const repository = new UserMemoryRepository();
    expect(await repository.create()).toStrictEqual(user);
  });
});
