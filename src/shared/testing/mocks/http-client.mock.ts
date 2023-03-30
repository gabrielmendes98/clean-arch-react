import { HttpClient } from 'shared/domain/interfaces/http-client.interface';

export const httpClientMock: HttpClient = {
  delete: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
};
