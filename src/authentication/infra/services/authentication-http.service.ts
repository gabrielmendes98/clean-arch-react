import {
  LoginRequestDto,
  LoginResponseDto,
} from 'authentication/domain/dto/login.dto';
import {
  SignUpRequestDto,
  SignUpResponseDto,
} from 'authentication/domain/dto/sign-up.dto';
import { AuthenticationService } from 'authentication/domain/interfaces/authentication-service.interface';
import {
  HttpClientService,
  HttpResponse,
} from 'shared/application/http-client.port';

export class AuthenticationHttpService implements AuthenticationService {
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