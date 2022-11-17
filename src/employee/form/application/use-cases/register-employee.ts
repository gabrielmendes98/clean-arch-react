import { Employee } from 'employee/form/domain/entities/employee';

interface HttpClient {
  get: (...args: any) => Promise<any>;
  put: (...args: any) => Promise<any>;
  post: (...args: any) => Promise<any>;
  delete: (...args: any) => Promise<any>;
}

export class RegisterEmployeeUseCase {
  constructor(private httpClient: HttpClient) {}

  async execute(input: Input): Promise<Output> {
    const response = await this.httpClient.post(input);
    return response;
  }
}

export type Input = Omit<Employee, 'id'>;

export type Output = boolean;
