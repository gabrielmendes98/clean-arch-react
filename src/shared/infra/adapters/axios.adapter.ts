import axios, { AxiosResponse } from 'axios';
import {
  HttpClientOptions,
  HttpClientService,
  HttpResponse,
} from 'shared/application/http-client.port';

export class AxiosAdapter implements HttpClientService {
  constructor(public baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  async get<Response>(
    endpoint: string,
    options: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    let response: AxiosResponse;
    try {
      response = await axios.get(endpoint, options);
    } catch (e: any) {
      response = e.response;
    }
    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async post<Response>(
    endpoint: string,
    body: any,
    options: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    let response: AxiosResponse;
    try {
      response = await axios.post(endpoint, body, options);
    } catch (e: any) {
      response = e.response;
    }
    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async put<Response>(
    endpoint: string,
    body: any,
    options: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    let response: AxiosResponse;
    try {
      response = await axios.put(endpoint, body, options);
    } catch (e: any) {
      response = e.response;
    }
    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async delete<Response>(
    endpoint: string,
    options: HttpClientOptions,
  ): Promise<HttpResponse<Response>> {
    let response: AxiosResponse;
    try {
      response = await axios.delete(endpoint, options);
    } catch (e: any) {
      response = e.response;
    }
    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
