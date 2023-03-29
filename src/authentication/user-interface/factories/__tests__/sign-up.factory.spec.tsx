import { BrowserRouter } from 'react-router-dom';
import { UserContext } from 'authentication/infra/providers/user.provider';
import { render } from 'shared/testing/test-utils';
import { MakeSignUpPage } from '../sign-up.factory';

describe('MakeSignUpPage', () => {
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
            <MakeSignUpPage />
          </BrowserRouter>
        </UserContext.Provider>,
      ),
    ).not.toThrowError();
  });
});
