import { UserContext } from 'user/infra/providers/user.provider';
import { render } from 'shared/testing/test-utils';
import { MakeHomeContainer } from './home.factory';

describe('MakeHome', () => {
  it('should render without errors', () => {
    render(
      <UserContext.Provider
        value={{
          removeUser: jest.fn(),
          updateUser: jest.fn(),
          user: null,
        }}
      >
        <MakeHomeContainer />
      </UserContext.Provider>,
    );
  });
});
