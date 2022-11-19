import axios from 'axios';
import { HttpClient, HttpResponse } from 'shared/application/http-client';

export class AxiosAdapter<Response> implements HttpClient<Response> {
  async get(url: string): Promise<HttpResponse<Response>> {
    const response = await axios.get(url);
    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async post(url: string, body: any): Promise<HttpResponse<Response>> {
    const response = await axios.post(url, body);
    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async put(url: string, body: any): Promise<HttpResponse<Response>> {
    const response = await axios.put(url, body);
    return {
      statusCode: response.status,
      body: response.data,
    };
  }

  async delete(url: string): Promise<HttpResponse<Response>> {
    const response = await axios.delete(url);
    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
