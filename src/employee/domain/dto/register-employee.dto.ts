export type RegisterEmployeeResponseDto = {
  success: boolean;
};

export type RegisterEmployeeRequestDto = {
  name: string;
  email: string;
  document: string;
  salary: number;
};
