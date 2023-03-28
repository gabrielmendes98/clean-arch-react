import { LoginResponseDto } from 'authentication/domain/dto/login.dto';
import { SignUpResponseDto } from 'authentication/domain/dto/sign-up.dto';
import { AuthenticationService } from 'authentication/domain/interfaces/authentication-service.interface';
import {
  HttpResponse,
  HttpStatusCode,
} from 'shared/application/http-client.port';

export class AuthenticationMemoryService implements AuthenticationService {
  async login(): Promise<HttpResponse<LoginResponseDto>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
        email: 'fakeemail@gmail.com',
        id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
        name: 'Gabriel',
      },
    };
  }

  async signUp(): Promise<HttpResponse<SignUpResponseDto>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
        email: 'fakeemail@gmail.com',
        id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
        name: 'Gabriel',
      },
    };
  }
}
