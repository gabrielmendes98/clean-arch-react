import { Employee } from 'employee/domain/entities/employee.entity';
import { makeEmployeeService } from 'employee/infra/factories/employee-service.factory';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { notificationServiceMock } from 'shared/testing/mocks/notification.mock';
import { RegisterEmployeeUseCase } from '../register-employee.use-case';

const fakeEmployee = {
  document: '03542157015',
  email: 'some@email.com',
  name: 'some name',
  salary: 123123,
};

describe('RegisterEmployeeUseCase', () => {
  it('should validate employee', async () => {
    const validateEmployee = jest.spyOn(Employee, 'validate');
    const useCase = new RegisterEmployeeUseCase(
      makeEmployeeService(),
      notificationServiceMock,
    );
    await useCase.execute(fakeEmployee);
    expect(validateEmployee).toHaveBeenCalledWith(fakeEmployee);
  });

  it('should call api, return success and notify user', async () => {
    const apiService = makeEmployeeService();
    const registerEmployee = jest.spyOn(apiService, 'createEmployee');
    const useCase = new RegisterEmployeeUseCase(
      apiService,
      notificationServiceMock,
    );
    const response = await useCase.execute(fakeEmployee);
    expect(registerEmployee).toHaveBeenCalledWith(fakeEmployee);
    expect(notificationServiceMock.notify).toHaveBeenCalledWith(
      'Funcionário cadastrado com sucesso!',
      'success',
    );
    expect(response.success).toBeTruthy();
  });

  it('should throw unexpected error when api returns any error and notify user', async () => {
    const apiService = makeEmployeeService();
    const registerEmployee = jest
      .spyOn(apiService, 'createEmployee')
      .mockReturnValue(
        Promise.resolve({ statusCode: 500, body: { success: false } }),
      );
    const useCase = new RegisterEmployeeUseCase(
      apiService,
      notificationServiceMock,
    );
    await expect(
      async () => await useCase.execute(fakeEmployee),
    ).rejects.toThrow(UnexpectedError);
    expect(registerEmployee).toHaveBeenCalledWith(fakeEmployee);
    expect(notificationServiceMock.notify).toHaveBeenCalledWith(
      new UnexpectedError().message,
      'error',
    );
  });
});
