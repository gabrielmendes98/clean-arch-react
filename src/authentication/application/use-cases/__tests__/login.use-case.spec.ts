import { makeAuthGateway } from 'authentication/infra/factories/authentication-gateway.factory';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { Email } from 'shared/domain/value-objects/email.vo';
import { Password } from 'shared/domain/value-objects/password.vo';
import { routerServiceMock } from 'shared/testing/mocks/router.mock';
import { userStorageServiceMock } from 'shared/testing/mocks/user-storage.mock';
import { LoginUseCase } from '../login.use-case';

const makeAuthenticateUseCase = () =>
  new LoginUseCase(
    makeAuthGateway(),
    userStorageServiceMock,
    routerServiceMock,
  );

const executeSuccessUseCase = async (useCase: LoginUseCase) =>
  await useCase.execute({ email: 'email@gmail.com', password: '123123' });

describe('LoginUseCase', () => {
  it('should validate user email and password', async () => {
    const emailValidate = jest.spyOn(Email, 'validate');
    const passwordValidate = jest.spyOn(Password, 'validate');
    const useCase = makeAuthenticateUseCase();
    await executeSuccessUseCase(useCase);
    expect(emailValidate).toHaveBeenCalledWith('email@gmail.com');
    expect(passwordValidate).toHaveBeenCalledWith('123123');
  });

  it('should update user storage', async () => {
    const useCase = makeAuthenticateUseCase();
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

  it('should navigate to home after authenticate', async () => {
    const useCase = makeAuthenticateUseCase();
    await executeSuccessUseCase(useCase);
    expect(routerServiceMock.navigate).toHaveBeenCalledWith('/');
  });

  it('should return success', async () => {
    const useCase = makeAuthenticateUseCase();
    const response = await executeSuccessUseCase(useCase);
    expect(response.success).toBeTruthy();
  });

  it('should throw unexpected error when response is not ok', async () => {
    const gateway = makeAuthGateway();
    jest.spyOn(gateway, 'login').mockReturnValue(
      Promise.resolve({
        statusCode: 500,
        body: { message: 'some message' },
      }),
    );
    const useCase = new LoginUseCase(
      gateway,
      userStorageServiceMock,
      routerServiceMock,
    );

    await expect(async () => executeSuccessUseCase(useCase)).rejects.toThrow(
      UnexpectedError,
    );
  });
});
