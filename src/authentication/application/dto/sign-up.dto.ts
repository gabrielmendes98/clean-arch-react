export interface SignUpResponseDto {
  token: string;
  id: string;
  email: string;
  name: string;
}

export interface SignUpRequestDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
