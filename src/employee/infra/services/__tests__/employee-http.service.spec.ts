import { httpClientMock } from 'shared/testing/mocks/http-client.mock';
import { EmployeeHttpService } from '../employee-http.service';

describe('EmployeeHttpGateway', () => {
  let gateway: EmployeeHttpService;

  beforeEach(() => {
    gateway = new EmployeeHttpService(httpClientMock);
  });

  it('should call httpClient with correct params when call deleteEmployee method', async () => {
    await gateway.deleteEmployee('some-id');
    expect(httpClientMock.delete).toHaveBeenCalledWith('/employees/some-id');
  });

  it('should call httpClient with correct params when call getEmployee method', async () => {
    await gateway.getEmployee('some-id');
    expect(httpClientMock.get).toHaveBeenCalledWith('/employees/some-id');
  });

  it('should call httpClient with correct params when call listEmployees method', async () => {
    await gateway.listEmployees();
    expect(httpClientMock.get).toHaveBeenCalledWith('/employees');
  });

  it('should call httpClient with correct params when call createEmployee method', async () => {
    const data = {
      document: '123123',
      email: 'someemail@gmail.com',
      name: 'some name',
      salary: 123213,
    };
    await gateway.createEmployee(data);
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
    await gateway.updateEmployee(data);
    expect(httpClientMock.put).toHaveBeenCalledWith('/employees/some-id', data);
  });
});
