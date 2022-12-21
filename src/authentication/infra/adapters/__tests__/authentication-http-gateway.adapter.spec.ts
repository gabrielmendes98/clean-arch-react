import { SignUpRequestDto } from 'authentication/application/dto/sign-up.dto';
import { httpClientMock } from 'shared/testing/mocks/http-client.mock';
import { AuthenticationHttpGateway } from '../authentication-http-gateway.adapter';

describe('AuthenticationHttpGateway', () => {
  it('should call httpClient with correct params when call login method', async () => {
    const data = {
      email: 'someemail@gmail.com',
      password: '123213',
    };
    const gateway = new AuthenticationHttpGateway(httpClientMock);
    await gateway.login(data);
    expect(httpClientMock.post).toHaveBeenCalledWith('/session', data);
  });

  it('should call httpClient with correct params when call signUp method', async () => {
    const data: SignUpRequestDto = {
      email: 'someemail@gmail.com',
      password: '123213',
      confirmPassword: '123123',
      name: 'some name',
    };
    const gateway = new AuthenticationHttpGateway(httpClientMock);
    await gateway.signUp(data);
    expect(httpClientMock.post).toHaveBeenCalledWith('/users', data);
  });
});
