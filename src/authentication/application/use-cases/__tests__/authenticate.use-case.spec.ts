import { AuthenticationInMemoryHttpClient } from 'authentication/infra/adapters/in-memory-http-client.adapter';
import { RouterService } from 'shared/application/router.port';
import { UserStorageService } from 'shared/application/user-storage.port';
import { UnexpectedError } from 'shared/domain/errors/unexpected.error';
import { Email } from 'shared/domain/value-objects/email.vo';
import { Password } from 'shared/domain/value-objects/password.vo';
import { AuthenticateUseCase } from '../authenticate.use-case';

const stubUserStorageService: UserStorageService = {
  user: null,
  updateUser: jest.fn(),
  removeUser: jest.fn(),
};

const stubRouterService: RouterService = {
  navigate: jest.fn(),
  getUrlParams: jest.fn().mockReturnValue({}),
};

describe('AuthenticateUseCase', () => {
  it('should validate user email and password', async () => {
    const emailValidate = jest.spyOn(Email, 'validate');
    const passwordValidate = jest.spyOn(Password, 'validate');
    const useCase = new AuthenticateUseCase(
      new AuthenticationInMemoryHttpClient('fakeurl.com'),
      stubUserStorageService,
      stubRouterService,
    );

    await useCase.execute({ email: 'email@gmail.com', password: '123123' });
    expect(emailValidate).toHaveBeenCalledWith('email@gmail.com');
    expect(passwordValidate).toHaveBeenCalledWith('123123');
  });

  it('should update user storage', async () => {
    const useCase = new AuthenticateUseCase(
      new AuthenticationInMemoryHttpClient('fakeurl.com'),
      stubUserStorageService,
      stubRouterService,
    );
    await useCase.execute({ email: 'email@gmail.com', password: '123123' });
    expect(stubUserStorageService.updateUser).toHaveBeenCalledWith(
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
    const useCase = new AuthenticateUseCase(
      new AuthenticationInMemoryHttpClient('fakeurl.com'),
      stubUserStorageService,
      stubRouterService,
    );
    await useCase.execute({ email: 'email@gmail.com', password: '123123' });
    expect(stubRouterService.navigate).toHaveBeenCalledWith('/');
  });

  it('should return success', async () => {
    const useCase = new AuthenticateUseCase(
      new AuthenticationInMemoryHttpClient('fakeurl.com'),
      stubUserStorageService,
      stubRouterService,
    );
    const response = await useCase.execute({
      email: 'email@gmail.com',
      password: '123123',
    });
    expect(response.success).toBeTruthy();
  });

  it('should throw unexpected error when response is not ok', async () => {
    const httpClient = new AuthenticationInMemoryHttpClient('fakeurl.com');
    jest.spyOn(httpClient, 'post').mockReturnValue(
      Promise.resolve({
        statusCode: 500,
        body: {},
      }),
    );
    const useCase = new AuthenticateUseCase(
      httpClient,
      stubUserStorageService,
      stubRouterService,
    );

    await expect(
      async () =>
        await useCase.execute({
          email: 'email@gmail.com',
          password: '123123',
        }),
    ).rejects.toThrow(UnexpectedError);
  });
});
