import { HttpClient } from 'shared/domain/interfaces/http-client.interface';
import { HttpClientAxiosAdapter } from 'shared/infra/adapters/http-client-axios.adapter';
import { useUserStorage } from '../hooks/use-user-storage.hook';
import { HttpClientAuthDecorator } from '../decorators/http-client-auth.decorator';

export class AuthHttpClientFactory {
  static create(baseUrl: string): HttpClient {
    return new HttpClientAuthDecorator(
      baseUrl,
      useUserStorage(),
      new HttpClientAxiosAdapter(baseUrl),
    );
  }
}
