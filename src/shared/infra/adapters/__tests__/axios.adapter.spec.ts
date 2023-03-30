import axios, { AxiosError, AxiosResponse } from 'axios';
import { HttpClientAxiosAdapter } from '../http-client-axios.adapter';

describe('AxiosAdapter', () => {
  describe('get method', () => {
    it('should return correct body and status code on success', async () => {
      const getMethod = jest.spyOn(axios, 'get').mockReturnValue(
        Promise.resolve({
          status: 200,
          data: {
            someData: 111,
          },
        }),
      );
      const httpClient = new HttpClientAxiosAdapter('baseurl.com');
      const response = await httpClient.get('/fake');
      expect(getMethod).toHaveBeenCalledWith('/fake', undefined);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({
        someData: 111,
      });
    });

    it('should call axios with options', async () => {
      const getMethod = jest.spyOn(axios, 'get').mockReturnValue(
        Promise.resolve({
          status: 200,
          data: {
            someData: 111,
          },
        }),
      );
      const httpClient = new HttpClientAxiosAdapter('baseurl.com');
      await httpClient.get('/fake', {
        headers: { someHeader: 'value' },
      });
      expect(getMethod).toHaveBeenCalledWith('/fake', {
        headers: { someHeader: 'value' },
      });
    });

    it('should return correct body and status code on error', async () => {
      const getMethod = jest.spyOn(axios, 'get').mockReturnValue(
        Promise.reject(
          new AxiosError('Erro inesperado', '500', undefined, undefined, {
            status: 500,
            data: {
              message: 'Erro inesperado',
            },
          } as AxiosResponse),
        ),
      );
      const httpClient = new HttpClientAxiosAdapter('baseurl.com');
      const response = await httpClient.get('/fake');
      expect(getMethod).toHaveBeenCalledWith('/fake', undefined);
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: 'Erro inesperado',
      });
    });
  });

  describe('post method', () => {
    it('should return correct body and status code on success', async () => {
      const postMethod = jest.spyOn(axios, 'post').mockReturnValue(
        Promise.resolve({
          status: 200,
          data: {
            someData: 111,
          },
        }),
      );
      const httpClient = new HttpClientAxiosAdapter('baseurl.com');
      const response = await httpClient.post('/fake', {});
      expect(postMethod).toHaveBeenCalledWith('/fake', {}, undefined);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({
        someData: 111,
      });
    });

    it('should call axios with options', async () => {
      const postMethod = jest.spyOn(axios, 'post').mockReturnValue(
        Promise.resolve({
          status: 200,
          data: {
            someData: 111,
          },
        }),
      );
      const httpClient = new HttpClientAxiosAdapter('baseurl.com');
      await httpClient.post(
        '/fake',
        {},
        {
          headers: { someHeader: 'value' },
        },
      );
      expect(postMethod).toHaveBeenCalledWith(
        '/fake',
        {},
        {
          headers: { someHeader: 'value' },
        },
      );
    });

    it('should return correct body and status code on error', async () => {
      const postMethod = jest.spyOn(axios, 'post').mockReturnValue(
        Promise.reject(
          new AxiosError('Erro inesperado', '500', undefined, undefined, {
            status: 500,
            data: {
              message: 'Erro inesperado',
            },
          } as AxiosResponse),
        ),
      );
      const httpClient = new HttpClientAxiosAdapter('baseurl.com');
      const response = await httpClient.post('/fake', {});
      expect(postMethod).toHaveBeenCalledWith('/fake', {}, undefined);
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: 'Erro inesperado',
      });
    });
  });

  describe('put method', () => {
    it('should return correct body and status code on success', async () => {
      const putMethod = jest.spyOn(axios, 'put').mockReturnValue(
        Promise.resolve({
          status: 200,
          data: {
            someData: 111,
          },
        }),
      );
      const httpClient = new HttpClientAxiosAdapter('baseurl.com');
      const response = await httpClient.put('/fake', {});
      expect(putMethod).toHaveBeenCalledWith('/fake', {}, undefined);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({
        someData: 111,
      });
    });

    it('should call axios with options', async () => {
      const putMethod = jest.spyOn(axios, 'put').mockReturnValue(
        Promise.resolve({
          status: 200,
          data: {
            someData: 111,
          },
        }),
      );
      const httpClient = new HttpClientAxiosAdapter('baseurl.com');
      await httpClient.put(
        '/fake',
        {},
        {
          headers: { someHeader: 'value' },
        },
      );
      expect(putMethod).toHaveBeenCalledWith(
        '/fake',
        {},
        {
          headers: { someHeader: 'value' },
        },
      );
    });

    it('should return correct body and status code on error', async () => {
      const putMethod = jest.spyOn(axios, 'put').mockReturnValue(
        Promise.reject(
          new AxiosError('Erro inesperado', '500', undefined, undefined, {
            status: 500,
            data: {
              message: 'Erro inesperado',
            },
          } as AxiosResponse),
        ),
      );
      const httpClient = new HttpClientAxiosAdapter('baseurl.com');
      const response = await httpClient.put('/fake', {});
      expect(putMethod).toHaveBeenCalledWith('/fake', {}, undefined);
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: 'Erro inesperado',
      });
    });
  });

  describe('delete method', () => {
    it('should return correct body and status code on success', async () => {
      const deleteMethod = jest.spyOn(axios, 'delete').mockReturnValue(
        Promise.resolve({
          status: 200,
          data: {
            someData: 111,
          },
        }),
      );
      const httpClient = new HttpClientAxiosAdapter('baseurl.com');
      const response = await httpClient.delete('/fake');
      expect(deleteMethod).toHaveBeenCalledWith('/fake', undefined);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({
        someData: 111,
      });
    });

    it('should call axios with options', async () => {
      const deleteMethod = jest.spyOn(axios, 'delete').mockReturnValue(
        Promise.resolve({
          status: 200,
          data: {
            someData: 111,
          },
        }),
      );
      const httpClient = new HttpClientAxiosAdapter('baseurl.com');
      await httpClient.delete('/fake', {
        headers: { someHeader: 'value' },
      });
      expect(deleteMethod).toHaveBeenCalledWith('/fake', {
        headers: { someHeader: 'value' },
      });
    });

    it('should return correct body and status code on error', async () => {
      const deleteMethod = jest.spyOn(axios, 'delete').mockReturnValue(
        Promise.reject(
          new AxiosError('Erro inesperado', '500', undefined, undefined, {
            status: 500,
            data: {
              message: 'Erro inesperado',
            },
          } as AxiosResponse),
        ),
      );
      const httpClient = new HttpClientAxiosAdapter('baseurl.com');
      const response = await httpClient.delete('/fake');
      expect(deleteMethod).toHaveBeenCalledWith('/fake', undefined);
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: 'Erro inesperado',
      });
    });
  });
});
