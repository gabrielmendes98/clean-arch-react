import { MemoryRouter } from 'react-router-dom';
import { render } from 'shared/testing/test-utils';
import { Header } from './header.component';

describe('Header', () => {
  it('should navigate to pages', async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
