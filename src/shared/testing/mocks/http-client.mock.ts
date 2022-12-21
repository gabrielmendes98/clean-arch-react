import { HttpClientService } from 'shared/application/http-client.port';

export const httpClientMock: HttpClientService = {
  delete: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
};
