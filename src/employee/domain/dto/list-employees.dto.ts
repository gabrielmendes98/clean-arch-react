export type ListEmployeesRequestDto = void;

export type ListEmployeesResponseDto = {
  name: string;
  salary: number;
  id: string;
  document: string;
  email: string;
}[];
