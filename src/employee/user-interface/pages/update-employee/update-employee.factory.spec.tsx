import { BrowserRouter } from 'react-router-dom';
import { UserContext } from 'shared/infra/providers/user.provider';
import { render } from 'shared/testing/test-utils';
import { MakeUpdateEmployeePage } from './update-employee.factory';

describe('MakeUpdateEmployeeView', () => {
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
          <MakeUpdateEmployeePage />
        </BrowserRouter>
      </UserContext.Provider>,
    );
  });
});
