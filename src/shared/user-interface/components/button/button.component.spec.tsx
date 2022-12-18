import { render, screen, userEvent } from 'shared/testing/test-utils';
import { Button } from './button.component';

describe('Button', () => {
  it('should call onClick', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>click</Button>);
    userEvent.click(screen.getByRole('button', { name: 'click' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<Button>Some text</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
