export type GetEmployeeRequestDto = {
  id: string;
};

export type GetEmployeeResponseDto = {
  name: string;
  salary: number;
  id: string;
  document: string;
  email: string;
};
