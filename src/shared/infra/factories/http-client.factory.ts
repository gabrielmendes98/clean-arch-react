import { HttpClientAuthDecorator } from 'user/infra/decorators/http-client-auth.decorator';
import { HttpClient } from 'shared/domain/interfaces/http-client.interface';
import { HttpClientAxiosAdapter } from '../adapters/http-client-axios.adapter';

export class HttpClientFactory {
  static create(baseUrl: string): HttpClient {
    return new HttpClientAuthDecorator(
      baseUrl,
      new HttpClientAxiosAdapter(baseUrl),
    );
  }
}
