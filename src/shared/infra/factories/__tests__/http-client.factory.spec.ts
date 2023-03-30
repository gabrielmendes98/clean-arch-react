import { HttpClientAxiosAdapter } from 'shared/infra/adapters/http-client-axios.adapter';
import { HttpClientFactory } from '../http-client.factory';

describe('HttpClientFactory', () => {
  it('should return instance of AxiosAdapter', () => {
    expect(HttpClientFactory.create('baseurl.com')).toBeInstanceOf(
      HttpClientAxiosAdapter,
    );
  });
});
