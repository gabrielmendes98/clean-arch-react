import { HttpClientAuthorize } from 'shared/infra/decorators/http-client-authorize.decorator';
import { makeHttpClientAutorize } from '../http-client-authorize.factory';

jest.mock('../../adapters/user-storage.adapter');

describe('makeHttpClientAutorize', () => {
  it('should return instance of HttpClientAuthorize', () => {
    expect(makeHttpClientAutorize('baseurl.com')).toBeInstanceOf(
      HttpClientAuthorize,
    );
  });
});
