import { UserFactory } from 'user/domain/factories/user.factory';
import { HttpClient } from 'shared/domain/interfaces/http-client.interface';
import { storagePersistorMock } from 'shared/testing/mocks/persistor.mock';

import { HttpClientAuthDecorator } from '../http-client-auth.decorator';

const httpClientMock: HttpClient = {
  baseUrl: 'baseurl.com',
  get: jest.fn(),
  delete: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
};

const fakeUser = {
  email: 'someemail@gmail.com',
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  name: 'some name',
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
};

const user = UserFactory.create(fakeUser);

const createDecorator = () =>
  new HttpClientAuthDecorator(
    'baseurl.com',
    httpClientMock,
    storagePersistorMock,
  );

describe('HttpClientAuthDecorator', () => {
  beforeEach(() => {
    storagePersistorMock.get = jest.fn().mockReturnValue(user);
  });

  it('should call get method using auth headers and other headers', async () => {
    const httpClient = createDecorator();
    await httpClient.get('/some-endpoint', { headers: { someHeader: '123' } });
    expect(httpClientMock.get).toHaveBeenCalledWith('/some-endpoint', {
      headers: {
        someHeader: '123',
        'x-access-token': fakeUser.token,
      },
    });
  });

  it('should call delete method using auth headers and other headers', async () => {
    const httpClient = createDecorator();
    await httpClient.delete('/some-endpoint', {
      headers: { someHeader: '123' },
    });
    expect(httpClientMock.delete).toHaveBeenCalledWith('/some-endpoint', {
      headers: {
        someHeader: '123',
        'x-access-token': fakeUser.token,
      },
    });
  });

  it('should call post method using auth headers and other headers', async () => {
    const httpClient = createDecorator();
    await httpClient.post(
      '/some-endpoint',
      {},
      {
        headers: { someHeader: '123' },
      },
    );
    expect(httpClientMock.post).toHaveBeenCalledWith(
      '/some-endpoint',
      {},
      {
        headers: {
          someHeader: '123',
          'x-access-token': fakeUser.token,
        },
      },
    );
  });

  it('should call put method using auth headers and other headers', async () => {
    const httpClient = createDecorator();
    await httpClient.put(
      '/some-endpoint',
      {},
      {
        headers: { someHeader: '123' },
      },
    );
    expect(httpClientMock.put).toHaveBeenCalledWith(
      '/some-endpoint',
      {},
      {
        headers: {
          someHeader: '123',
          'x-access-token': fakeUser.token,
        },
      },
    );
  });
});
