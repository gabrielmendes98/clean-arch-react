import {
  LoginRequestDto,
  LoginResponseDto,
} from 'authentication/application/dto/login.dto';
import {
  SignUpRequestDto,
  SignUpResponseDto,
} from 'authentication/application/dto/sign-up.dto';
import { AuthenticationGateway } from 'authentication/application/ports/authentication-gateway.port';
import {
  HttpClientService,
  HttpResponse,
} from 'shared/application/http-client.port';

export class AuthenticationHttpGateway implements AuthenticationGateway {
  constructor(private httpClient: HttpClientService) {}

  async login(data: LoginRequestDto): Promise<HttpResponse<LoginResponseDto>> {
    return await this.httpClient.post<LoginResponseDto>('/session', data);
  }

  async signUp(
    data: SignUpRequestDto,
  ): Promise<HttpResponse<SignUpResponseDto>> {
    return await this.httpClient.post<SignUpResponseDto>('/users', data);
  }
}
