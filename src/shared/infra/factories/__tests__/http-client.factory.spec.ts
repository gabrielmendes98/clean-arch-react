import { HttpClientAuthDecorator } from 'authentication/infra/decorators/http-client-auth.decorator';
import { HttpClientFactory } from '../http-client.factory';

jest.mock('authentication/infra/hooks/use-user-storage.hook', () => ({
  useUserStorage: () => ({
    user: {
      token: 'token',
    },
  }),
}));

describe('HttpClientFactory', () => {
  it('should return instance of AxiosAdapter', () => {
    expect(HttpClientFactory.create('baseurl.com')).toBeInstanceOf(
      HttpClientAuthDecorator,
    );
  });
});
