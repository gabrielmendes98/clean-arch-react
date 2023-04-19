export interface GetEmployeeHttpResponseDto {
  id: string;
  name: string;
  salary: number;
  document: string;
  email: string;
}

export interface ListEmployeesHttpResponseDto {
  employees: {
    id: string;
    name: string;
    salary: number;
    document: string;
    email: string;
  }[];
}

export interface RegisterEmployeeHttpRequestDto {
  name: string;
  salary: number;
  document: string;
  email: string;
}

export interface UpdateEmployeeRequestDto {
  id: string;
  name: string;
  salary: number;
  document: string;
  email: string;
}
