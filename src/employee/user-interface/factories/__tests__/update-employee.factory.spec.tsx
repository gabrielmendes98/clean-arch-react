import { BrowserRouter } from 'react-router-dom';
import { UserContext } from 'authentication/infra/providers/user.provider';
import { render } from 'shared/testing/test-utils';
import { MakeUpdateEmployeeContainer } from '../update-employee.factory';

describe('MakeUpdateEmployeeContainer', () => {
  it('should render without errors', () => {
    render(
      <UserContext.Provider
        value={{
          removeUser: jest.fn(),
          updateUser: jest.fn(),
          user: null,
        }}
      >
        <BrowserRouter>
          <MakeUpdateEmployeeContainer />
        </BrowserRouter>
      </UserContext.Provider>,
    );
  });
});
