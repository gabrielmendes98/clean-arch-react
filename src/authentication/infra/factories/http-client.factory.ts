import { HttpClientService } from 'shared/application/http-client.port';
import { makeHttpClient as makeHttpClientFactory } from 'shared/infra/factories/http-client.factory';
import { personsApiConfig } from 'shared/infra/adapters/persons-api.adapter';
import { AuthenticationInMemoryHttpClient } from '../adapters/in-memory-http-client.adapter';

export const makeHttpClient = (): HttpClientService =>
  personsApiConfig.mock
    ? new AuthenticationInMemoryHttpClient(personsApiConfig.baseUrl)
    : makeHttpClientFactory(personsApiConfig.baseUrl);
