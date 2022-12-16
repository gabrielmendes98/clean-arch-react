import { BrowserRouter } from 'react-router-dom';
import { UserContext } from 'shared/infra/providers/user.provider';
import { render } from 'shared/testing/test-utils';
import { MakeRegisterEmployeePage } from './register-employee.factory';

describe('MakeRegisterEmployeePage', () => {
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
          <MakeRegisterEmployeePage />
        </BrowserRouter>
      </UserContext.Provider>,
    );
  });
});
