import { BrowserRouter } from 'react-router-dom';
import { UserContext } from 'user/infra/providers/user.provider';
import { render } from 'shared/testing/test-utils';
import { MakeRegisterEmployeeContainer } from '../register-employee.factory';

describe('MakeRegisterEmployeeContainer', () => {
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
          <MakeRegisterEmployeeContainer />
        </BrowserRouter>
      </UserContext.Provider>,
    );
  });
});
