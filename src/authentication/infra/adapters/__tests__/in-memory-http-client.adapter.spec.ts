import { AuthenticationInMemoryHttpClient } from '../in-memory-http-client.adapter';

describe('AuthenticationInMemoryHttpClient', () => {
  it('should return success when call post request', async () => {
    const httpClient = new AuthenticationInMemoryHttpClient('fakeurl.com');
    const response = await httpClient.post();
    expect(response).toStrictEqual({
      statusCode: 200,
      body: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
        email: 'fakeemail@gmail.com',
        id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
        name: 'Gabriel',
      },
    });
  });
});
