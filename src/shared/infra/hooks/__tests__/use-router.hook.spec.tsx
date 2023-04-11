import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { act, renderHook, render, screen } from 'shared/testing/test-utils';
import { useRouter } from '../use-router.hook';

describe('useRouter', () => {
  it('should navigate to page', () => {
    window.history.pushState({}, 'Test page', '/');
    const wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
    const { result } = renderHook(() => useRouter(), { wrapper });
    act(() => {
      result.current.navigate('/some-route');
    });
    expect(window.location.pathname).toBe('/some-route');
  });

  it('should return correct route params', () => {
    const ParamsDisplay = () => {
      const { getUrlParams } = useRouter();
      const { id } = getUrlParams();

      return <div>{id}</div>;
    };
    const Component = () => (
      <MemoryRouter initialEntries={[{ pathname: '/some-id' }]}>
        <Routes>
          <Route path="/:id" element={<ParamsDisplay />} />
        </Routes>
      </MemoryRouter>
    );
    render(<Component />);
    expect(screen.getByText('some-id')).toBeInTheDocument();
  });
});
