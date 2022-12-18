import { personsApiConfig } from '../persons-api.adapter';

describe('personsApiConfig', () => {
  it('should be defined', () => {
    expect(personsApiConfig.baseUrl).toBeDefined();
    expect(personsApiConfig.mock).toBeDefined();
  });
});
