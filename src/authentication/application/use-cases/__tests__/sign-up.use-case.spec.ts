import { makeAuthApiService } from 'authentication/infra/factories/authentication-api-service.factory';
import { InvalidPasswordError } from 'shared/domain/errors/invalid-password.error';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { ValidationError } from 'shared/domain/errors/validation.error';
import { Email } from 'shared/domain/value-objects/email.vo';
import { Password } from 'shared/domain/value-objects/password.vo';
import { notificationServiceMock } from 'shared/testing/mocks/notification.mock';
import { routerServiceMock } from 'shared/testing/mocks/router.mock';
import { userStorageServiceMock } from 'shared/testing/mocks/user-storage.mock';
import { SignUpUseCase } from '../sign-up.use-case';

const makeSignUpUseCase = () =>
  new SignUpUseCase(
    makeAuthApiService(),
    userStorageServiceMock,
    routerServiceMock,
    notificationServiceMock,
  );

const executeSuccessUseCase = async (useCase: SignUpUseCase) =>
  await useCase.execute({
    email: 'someemail@gmail.com',
    name: 'some name',
    password: 'some pass',
    confirmPassword: 'some pass',
  });

describe('SignUpUseCase', () => {
  it('should validate input', async () => {
    const emailValidate = jest.spyOn(Email, 'validate');
    const passwordValidate = jest.spyOn(Password, 'validate');
    const useCase = makeSignUpUseCase();
    await expect(
      async () =>
        await useCase.execute({
          email: 'someemail@gmail.com',
          name: 'some name',
          password: 'some pass',
          confirmPassword: 'some wrong pass',
        }),
    ).rejects.toThrow(InvalidPasswordError);
    expect(emailValidate).toHaveBeenCalledWith('someemail@gmail.com');
    expect(passwordValidate).toHaveBeenCalledWith('some pass');
    expect(passwordValidate).toHaveBeenCalledWith('some wrong pass');
    expect(notificationServiceMock.notify).toHaveBeenCalled();
  });

  it('should validate name input', async () => {
    const useCase = makeSignUpUseCase();
    await expect(
      async () =>
        await useCase.execute({
          email: 'someemail@gmail.com',
          name: '',
          password: 'some pass',
          confirmPassword: 'some wrong pass',
        }),
    ).rejects.toThrow(ValidationError);
  });

  it('should update user storage', async () => {
    const useCase = makeSignUpUseCase();
    await executeSuccessUseCase(useCase);
    expect(userStorageServiceMock.updateUser).toHaveBeenCalledWith(
      expect.objectContaining({
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
        email: 'fakeemail@gmail.com',
        id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
        name: 'Gabriel',
      }),
    );
  });

  it('should navigate to home after sign up', async () => {
    const useCase = makeSignUpUseCase();
    await executeSuccessUseCase(useCase);
    expect(routerServiceMock.navigate).toHaveBeenCalledWith('/');
  });

  it('should return success', async () => {
    const useCase = makeSignUpUseCase();
    const response = await executeSuccessUseCase(useCase);
    expect(response.success).toBeTruthy();
  });

  it('should throw unexpected error when response is not ok', async () => {
    const apiService = makeAuthApiService();
    jest.spyOn(apiService, 'signUp').mockReturnValue(
      Promise.resolve({
        statusCode: 500,
        body: { message: 'error message' },
      }),
    );
    const useCase = new SignUpUseCase(
      apiService,
      userStorageServiceMock,
      routerServiceMock,
      notificationServiceMock,
    );
    await expect(executeSuccessUseCase(useCase)).rejects.toThrow(
      UnexpectedError,
    );
  });
});
