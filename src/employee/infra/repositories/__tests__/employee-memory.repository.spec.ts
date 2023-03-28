import { EmployeeMemoryService } from '../employee-memory.repository';

describe('EmployeeMemoryGateway', () => {
  let gateway: EmployeeMemoryService;

  beforeEach(() => {
    gateway = new EmployeeMemoryService();
  });

  it('should return correct payload when call deleteEmployee method', async () => {
    expect(await gateway.delete()).toStrictEqual({
      statusCode: 200,
      body: {
        success: true,
      },
    });
  });

  it('should return correct payload when call getEmployee method', async () => {
    expect(await gateway.get()).toStrictEqual({
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

  it('should return correct payload when call listEmployees method', async () => {
    expect(await gateway.list()).toStrictEqual({
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

  it('should return correct payload when call createEmployee method', async () => {
    expect(await gateway.create()).toStrictEqual({
      statusCode: 200,
      body: {
        success: true,
      },
    });
  });

  it('should return correct payload when call updateEmployee method', async () => {
    expect(await gateway.update()).toStrictEqual({
      statusCode: 200,
      body: {
        success: true,
      },
    });
  });
});
