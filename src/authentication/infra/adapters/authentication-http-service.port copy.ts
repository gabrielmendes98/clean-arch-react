import {
  LoginRequestDto,
  LoginResponseDto,
} from 'authentication/application/dto/login.dto';
import {
  SignUpRequestDto,
  SignUpResponseDto,
} from 'authentication/application/dto/sign-up.dto';
import { AuthenticationApiService } from 'authentication/application/ports/authentication-api-service.port';
import {
  HttpClientService,
  HttpResponse,
} from 'shared/application/http-client.port';

export class AuthenticationHttpService implements AuthenticationApiService {
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
