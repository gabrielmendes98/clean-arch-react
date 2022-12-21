import { AuthenticationGateway } from 'authentication/application/ports/authentication-gateway.port';
import { makeHttpClient as makeHttpClientFactory } from 'shared/infra/factories/http-client.factory';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { AuthenticationMemoryGateway } from '../adapters/authentication-memory-gateway.adapter';
import { AuthenticationHttpGateway } from '../adapters/authentication-http-gateway.adapter';

export const makeAuthGateway = (): AuthenticationGateway =>
  personsApiConfig.mock
    ? new AuthenticationMemoryGateway()
    : new AuthenticationHttpGateway(
        makeHttpClientFactory(personsApiConfig.baseUrl),
      );
