import { ApiConfig } from 'shared/application/api-config';

export const personsApiConfig: ApiConfig = {
  mock: process.env.REACT_APP_PERSONS_API_MOCK === 'true',
  baseUrl: process.env.REACT_APP_PERSONS_API_BASE_URL,
};
