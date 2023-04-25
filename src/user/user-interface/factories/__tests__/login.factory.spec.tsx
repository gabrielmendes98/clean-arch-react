import { BrowserRouter } from 'react-router-dom';
import { UserContext } from 'user/infra/providers/user.provider';
import { render } from 'shared/testing/test-utils';
import { MakeLoginContainer } from '../login.factory';

describe('MakeLoginPage', () => {
  it('should render without errors', () => {
    expect(() =>
      render(
        <UserContext.Provider
          value={{
            removeUser: jest.fn(),
            updateUser: jest.fn(),
            user: null,
          }}
        >
          <BrowserRouter>
            <MakeLoginContainer />
          </BrowserRouter>
        </UserContext.Provider>,
      ),
    ).not.toThrowError();
  });
});
