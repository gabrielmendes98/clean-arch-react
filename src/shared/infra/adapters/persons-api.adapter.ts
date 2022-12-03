import { ApiConfigService } from 'shared/application/api-config.port';

export const personsApiConfig: ApiConfigService = {
  mock: process.env.REACT_APP_PERSONS_API_MOCK === 'true',
  baseUrl: process.env.REACT_APP_PERSONS_API_BASE_URL,
};
