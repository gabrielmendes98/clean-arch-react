export type UpdateEmployeeResponseDto = {
  success: boolean;
};

export type UpdateEmployeeRequestDto = {
  id: string;
  name: string;
  email: string;
  document: string;
  salary: number;
};
