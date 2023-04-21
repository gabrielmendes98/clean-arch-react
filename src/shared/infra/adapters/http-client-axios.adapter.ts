import axios, { AxiosResponse } from 'axios';
import {
  HttpClientOptions,
  HttpClient,
  HttpResponse,
} from 'shared/domain/interfaces/http-client.interface';

export class HttpClientAxiosAdapter implements HttpClient {
  constructor(public baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  async get<DTOResponse>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<DTOResponse>> {
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

  async post<DTOResponse>(
    endpoint: string,
    body: any,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<DTOResponse>> {
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

  async put<DTOResponse>(
    endpoint: string,
    body: any,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<DTOResponse>> {
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

  async delete<DTOResponse>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Promise<HttpResponse<DTOResponse>> {
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
