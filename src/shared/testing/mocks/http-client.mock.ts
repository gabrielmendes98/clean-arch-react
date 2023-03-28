import { HttpClientService } from 'shared/domain/interfaces/http-client.interface';

export const httpClientMock: HttpClientService = {
  delete: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
};
