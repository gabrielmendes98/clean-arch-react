import { personsApiConfig } from './persons-api.config';

describe('personsApiConfig', () => {
  it('should be defined', () => {
    expect(personsApiConfig.baseUrl).toBeDefined();
    expect(personsApiConfig.mock).toBeDefined();
  });
});
