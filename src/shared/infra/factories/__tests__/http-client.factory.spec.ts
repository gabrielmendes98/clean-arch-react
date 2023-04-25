import { HttpClientAuthDecorator } from 'user/infra/decorators/http-client-auth.decorator';
import { HttpClientFactory } from '../http-client.factory';

describe('HttpClientFactory', () => {
  it('should return instance of AxiosAdapter', () => {
    expect(HttpClientFactory.create('baseurl.com')).toBeInstanceOf(
      HttpClientAuthDecorator,
    );
  });
});
