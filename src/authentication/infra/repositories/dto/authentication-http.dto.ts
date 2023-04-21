export interface LoginHttpResponseDto {
  token: string;
  id: string;
  email: string;
  name: string;
}

export interface LoginHttpRequestDto {
  email: string;
  password: string;
}

export interface SignUpHttpResponseDto {
  token: string;
  id: string;
  email: string;
  name: string;
}

export interface SignUpHttpRequestDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
