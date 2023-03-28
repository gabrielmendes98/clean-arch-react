import { httpClientMock } from 'shared/testing/mocks/http-client.mock';
import { EmployeeHttpRepository } from '../employee-http.repository';

describe('EmployeeHttpGateway', () => {
  let gateway: EmployeeHttpRepository;

  beforeEach(() => {
    gateway = new EmployeeHttpRepository(httpClientMock);
  });

  it('should call httpClient with correct params when call deleteEmployee method', async () => {
    await gateway.delete('some-id');
    expect(httpClientMock.delete).toHaveBeenCalledWith('/employees/some-id');
  });

  it('should call httpClient with correct params when call getEmployee method', async () => {
    await gateway.get('some-id');
    expect(httpClientMock.get).toHaveBeenCalledWith('/employees/some-id');
  });

  it('should call httpClient with correct params when call listEmployees method', async () => {
    await gateway.list();
    expect(httpClientMock.get).toHaveBeenCalledWith('/employees');
  });

  it('should call httpClient with correct params when call createEmployee method', async () => {
    const data = {
      document: '123123',
      email: 'someemail@gmail.com',
      name: 'some name',
      salary: 123213,
    };
    await gateway.create(data);
    expect(httpClientMock.post).toHaveBeenCalledWith('/employees', data);
  });

  it('should call httpClient with correct params when call updateEmployee method', async () => {
    const data = {
      id: 'some-id',
      document: '123123',
      email: 'someemail@gmail.com',
      name: 'some name',
      salary: 123213,
    };
    await gateway.update(data);
    expect(httpClientMock.put).toHaveBeenCalledWith('/employees/some-id', data);
  });
});
