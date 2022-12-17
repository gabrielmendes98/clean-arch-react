import { pages } from './pages';

describe('pages config', () => {
  it('should return pages correctly', () => {
    expect(pages.home).toBe('/');
    expect(pages.registerEmployees).toBe('/register-employees');
    expect(pages.listEmployees).toBe('/employees');
    expect(pages.updateEmployee('some-id')).toBe('/employees/some-id');
    expect(pages.login).toBe('/login');
    expect(pages.signUp).toBe('/sign-up');
  });
});
