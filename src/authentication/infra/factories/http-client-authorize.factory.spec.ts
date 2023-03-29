import { HttpClientAuthorize } from '../decorators/http-client-authorize.decorator';
import { makeHttpClientAutorize } from './http-client-authorize.factory';

jest.mock('../hooks/use-user-storage.hook');

describe('makeHttpClientAutorize', () => {
  it('should return instance of HttpClientAuthorize', () => {
    expect(makeHttpClientAutorize('baseurl.com')).toBeInstanceOf(
      HttpClientAuthorize,
    );
  });
});
