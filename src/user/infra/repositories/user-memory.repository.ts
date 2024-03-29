import { User } from 'user/domain/entities/user.entity';
import { UserFactory } from 'user/domain/factories/user.factory';
import { UserRepository } from 'user/domain/interfaces/user-repository.interface';

export class UserMemoryRepository implements UserRepository {
  async get(): Promise<User> {
    return UserFactory.create({
      token:
        'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
      email: 'fakeemail@gmail.com',
      id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
      name: 'Gabriel',
    });
  }

  async create(): Promise<User> {
    return UserFactory.create({
      token:
        'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
      email: 'fakeemail@gmail.com',
      id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
      name: 'Gabriel',
    });
  }
}
