import { HttpResponse } from 'shared/application/http-client.port';
import { LoginRequestDto, LoginResponseDto } from '../dto/login.dto';
import { SignUpRequestDto, SignUpResponseDto } from '../dto/sign-up.dto';

export interface AuthenticationService {
  login(data: LoginRequestDto): Promise<HttpResponse<LoginResponseDto>>;
  signUp(data: SignUpRequestDto): Promise<HttpResponse<SignUpResponseDto>>;
}
