export const httpClientMock = {
  delete: jest.fn().mockReturnValue({ statusCode: 200, body: {} }),
  get: jest.fn().mockReturnValue({ statusCode: 200, body: {} }),
  post: jest.fn().mockReturnValue({ statusCode: 200, body: {} }),
  put: jest.fn().mockReturnValue({ statusCode: 200, body: {} }),
};
