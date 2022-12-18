import { AxiosAdapter } from 'shared/infra/adapters/axios.adapter';
import { makeHttpClient } from '../http-client.factory';

describe('makeHttpClient', () => {
  it('should return instance of AxiosAdapter', () => {
    expect(makeHttpClient('baseurl.com')).toBeInstanceOf(AxiosAdapter);
  });
});
