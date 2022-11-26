import axios from 'axios';
import { HttpClient, HttpResponse } from 'shared/application/http-client';

export class AxiosAdapter implements HttpClient {
  constructor(public baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  async get<Response>(endpoint: string): Promise<HttpResponse<Response>> {
    const response = await axios.get(endpoint);
    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async post<Response>(
    endpoint: string,
    body: any,
  ): Promise<HttpResponse<Response>> {
    const response = await axios.post(endpoint, body);
    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async put<Response>(
    endpoint: string,
    body: any,
  ): Promise<HttpResponse<Response>> {
    const response = await axios.put(endpoint, body);
    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async delete<Response>(endpoint: string): Promise<HttpResponse<Response>> {
    const response = await axios.delete(endpoint);
    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
