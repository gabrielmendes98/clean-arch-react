import { render } from 'shared/testing/test-utils';
import { Footer } from './footer.component';

describe('Footer', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
