import { AuthenticationService } from 'authentication/domain/interfaces/authentication-service.interface';
import { personsApiConfig } from 'shared/infra/config/persons-api.config';
import { makeHttpClient as makeHttpClientFactory } from 'shared/infra/factories/http-client.factory';
import { AuthenticationHttpService } from '../services/authentication-http.service';
import { AuthenticationMemoryService } from '../services/authentication-memory.service';

export const makeAuthService = (): AuthenticationService =>
  personsApiConfig.mock
    ? new AuthenticationMemoryService()
    : new AuthenticationHttpService(
        makeHttpClientFactory(personsApiConfig.baseUrl),
      );
