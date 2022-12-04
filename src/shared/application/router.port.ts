export interface RouterService {
  navigate(url: string): void;
  getUrlParams(): Record<string, string | undefined>;
}
