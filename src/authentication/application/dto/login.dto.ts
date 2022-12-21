export interface LoginResponseDto {
  token: string;
  id: string;
  email: string;
  name: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}
