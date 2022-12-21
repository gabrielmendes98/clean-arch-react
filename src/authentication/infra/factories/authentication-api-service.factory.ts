import { AuthenticationApiService } from 'authentication/application/ports/authentication-api-service.port';
import { makeHttpClient as makeHttpClientFactory } from 'shared/infra/factories/http-client.factory';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { AuthenticationInMemoryService } from '../adapters/authentication-in-memory-service.port';
import { AuthenticationHttpService } from '../adapters/authentication-http-service.port copy';

export const makeAuthApiService = (): AuthenticationApiService =>
  personsApiConfig.mock
    ? new AuthenticationInMemoryService()
    : new AuthenticationHttpService(
        makeHttpClientFactory(personsApiConfig.baseUrl),
      );
