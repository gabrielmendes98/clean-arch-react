declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_EMPLOYEE_API_BASE_URL: string;
    }
  }
}
export {};
