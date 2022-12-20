import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { render } from 'shared/testing/test-utils';
import { MainLayout } from './main.layout';

const Component = () => <div>some children</div>;

describe('MainLayout', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />} path="/">
            <Route path="" element={<Component />} />
          </Route>
        </Routes>
      </BrowserRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
