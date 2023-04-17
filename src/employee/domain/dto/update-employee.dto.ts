export type UpdateEmployeeResponseDto = void;

export type UpdateEmployeeRequestDto = {
  id: string;
  name: string;
  email: string;
  document: string;
  salary: number;
};
