import { EmployeesInMemoryHttpClient } from '../in-memory-http-client.adapter';

describe('EmployeesInMemoryHttpClient', () => {
  test('get should return list of employees when endpoint is /employees', async () => {
    const httpClient = new EmployeesInMemoryHttpClient('fake.com');
    expect(await httpClient.get('/employees')).toStrictEqual({
      statusCode: 200,
      body: [
        {
          email: 'gabriel@gmail.com',
          id: 'bb30888c-06cf-458b-aced-8a75187c6a67',
          name: 'Gabriel Santiago',
          salary: 25000,
          document: '98536970090',
        },
        {
          email: 'joaodasilva@gmail.com',
          id: '11cbc2c2-32c2-42c5-ba5e-c21ca92a3047',
          name: 'João da Silva',
          salary: 20000,
          document: '75986850025',
        },
      ],
    });
  });

  test('get should return employee by id when pass id on url', async () => {
    const httpClient = new EmployeesInMemoryHttpClient('fake.com');
    expect(await httpClient.get('/employees/someid')).toStrictEqual({
      statusCode: 200,
      body: {
        email: 'gabriel@gmail.com',
        id: 'bb30888c-06cf-458b-aced-8a75187c6a67',
        name: 'Gabriel Santiago',
        salary: 25000,
        document: '98536970090',
      },
    });
  });

  test('post should return success', async () => {
    const httpClient = new EmployeesInMemoryHttpClient('fake.com');
    expect(await httpClient.post()).toStrictEqual({
      statusCode: 200,
      body: {
        success: true,
      },
    });
  });

  test('put should return success', async () => {
    const httpClient = new EmployeesInMemoryHttpClient('fake.com');
    expect(await httpClient.put()).toStrictEqual({
      statusCode: 200,
      body: {
        success: true,
      },
    });
  });

  test('delete should return success', async () => {
    const httpClient = new EmployeesInMemoryHttpClient('fake.com');
    expect(await httpClient.delete()).toStrictEqual({
      statusCode: 200,
      body: {
        success: true,
      },
    });
  });
});
