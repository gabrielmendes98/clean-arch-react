declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_PERSONS_API_MOCK: string;
      REACT_APP_PERSONS_API_BASE_URL: string;
    }
  }
}
export {};
