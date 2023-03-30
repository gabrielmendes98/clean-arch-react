import { HttpClientAuthDecorator } from '../decorators/http-client-auth.decorator';
import { AuthHttpClientFactory } from './auth-http-client.factory';

jest.mock('../hooks/use-user-storage.hook');

describe('AuthenticatedHttpClientFactory', () => {
  it('should return instance of HttpClientAuthorize', () => {
    expect(AuthHttpClientFactory.create('baseurl.com')).toBeInstanceOf(
      HttpClientAuthDecorator,
    );
  });
});
