import { Password } from 'user/domain/value-objects/password.vo';
import { httpClientMock } from 'shared/testing/mocks/http-client.mock';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UserHttpRepository } from '../user-http.repository';

const body = {
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
  email: 'fakeemail@gmail.com',
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  name: 'Gabriel',
};

describe('userHttpRepository', () => {
  it('should call httpClient with correct params when call login method', async () => {
    httpClientMock.post.mockReturnValue({
      statusCode: 200,
      body,
    });
    const data = {
      email: 'someemail@gmail.com',
      password: '123213',
    };
    const repository = new UserHttpRepository(httpClientMock);
    await repository.get(new Email(data.email), new Password(data.password));
    expect(httpClientMock.post).toHaveBeenCalledWith('/session', data);
  });

  it('should call httpClient with correct params when call signUp method', async () => {
    httpClientMock.post.mockReturnValue({
      statusCode: 201,
      body,
    });
    const data = {
      email: 'someemail@gmail.com',
      password: '123213',
      confirmPassword: '123123',
      name: 'some name',
    };
    const repository = new UserHttpRepository(httpClientMock);
    await repository.create(
      data.name,
      new Email(data.email),
      new Password(data.password),
      new Password(data.confirmPassword),
    );
    expect(httpClientMock.post).toHaveBeenCalledWith('/users', data);
  });
});
