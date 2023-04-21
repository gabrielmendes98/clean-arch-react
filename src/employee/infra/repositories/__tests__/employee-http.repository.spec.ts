import { EmployeeFactory } from 'employee/domain/factories/employee.factory';
import { httpClientMock } from 'shared/testing/mocks/http-client.mock';
import { EmployeeHttpRepository } from '../employee-http.repository';

const fakeEmployee = EmployeeFactory.create({
  id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
  document: '39517705034',
  email: 'someemail@gmail.com',
  name: 'some name',
  salary: 123213,
});

describe('EmployeeHttpRepository', () => {
  let repository: EmployeeHttpRepository;

  beforeEach(() => {
    repository = new EmployeeHttpRepository(httpClientMock);
  });

  it('should call httpClient with correct params when call deleteEmployee method', async () => {
    httpClientMock.delete.mockReturnValue(
      Promise.resolve({
        body: null,
        statusCode: 200,
      }),
    );
    await repository.delete(fakeEmployee);
    expect(httpClientMock.delete).toHaveBeenCalledWith(
      `/employees/${fakeEmployee.id}`,
    );
  });

  it('should call httpClient with correct params when call getEmployee method', async () => {
    httpClientMock.get.mockReturnValue(
      Promise.resolve({
        body: fakeEmployee,
        statusCode: 200,
      }),
    );
    await repository.get(fakeEmployee.id!);
    expect(httpClientMock.get).toHaveBeenCalledWith(
      `/employees/${fakeEmployee.id}`,
    );
  });

  it('should call httpClient with correct params when call listEmployees method and return EmployeeList instance', async () => {
    httpClientMock.get.mockReturnValue(
      Promise.resolve({
        body: {
          employees: [fakeEmployee],
        },
        statusCode: 200,
      }),
    );
    await repository.list();
    expect(httpClientMock.get).toHaveBeenCalledWith('/employees');
  });

  it('should call httpClient with correct params when call createEmployee method', async () => {
    httpClientMock.post.mockReturnValue(
      Promise.resolve({
        body: void 0,
        statusCode: 201,
      }),
    );
    await repository.create(fakeEmployee);
    expect(httpClientMock.post).toHaveBeenCalledWith('/employees', {
      document: fakeEmployee.document,
      email: fakeEmployee.email,
      name: fakeEmployee.name,
      salary: fakeEmployee.salary,
    });
  });

  it('should call httpClient with correct params when call updateEmployee method', async () => {
    httpClientMock.put.mockReturnValue(
      Promise.resolve({
        body: void 0,
        statusCode: 200,
      }),
    );
    await repository.update(fakeEmployee);
    expect(httpClientMock.put).toHaveBeenCalledWith(
      `/employees/${fakeEmployee.id}`,
      {
        document: fakeEmployee.document,
        email: fakeEmployee.email,
        name: fakeEmployee.name,
        salary: fakeEmployee.salary,
        id: fakeEmployee.id,
      },
    );
  });
});
