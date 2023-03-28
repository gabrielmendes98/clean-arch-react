import { SignUpRequestDto } from 'authentication/domain/dto/sign-up.dto';
import { httpClientMock } from 'shared/testing/mocks/http-client.mock';
import { AuthenticationHttpService } from '../authentication-http.service';

describe('AuthenticationHttpGateway', () => {
  it('should call httpClient with correct params when call login method', async () => {
    const data = {
      email: 'someemail@gmail.com',
      password: '123213',
    };
    const gateway = new AuthenticationHttpService(httpClientMock);
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
    const gateway = new AuthenticationHttpService(httpClientMock);
    await gateway.signUp(data);
    expect(httpClientMock.post).toHaveBeenCalledWith('/users', data);
  });
});
