import { BrowserRouter } from 'react-router-dom';
import { UserContext } from 'shared/infra/providers/user.provider';
import { render } from 'shared/testing/test-utils';
import { MakeListEmployeesPage } from './list-employees.factory';

describe('MakeListEmployeesPage', () => {
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
          <MakeListEmployeesPage />
        </BrowserRouter>
      </UserContext.Provider>,
    );
  });
});
