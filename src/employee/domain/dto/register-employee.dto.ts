export type RegisterEmployeeRequestDto = {
  name: string;
  email: string;
  document: string;
  salary: number;
};

export type RegisterEmployeeResponseDto = {
  id: string;
  name: string;
  email: string;
  document: string;
  salary: number;
};
