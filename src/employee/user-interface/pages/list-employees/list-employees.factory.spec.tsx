import { BrowserRouter } from 'react-router-dom';
import { UserContext } from 'shared/infra/providers/user.provider';
import { render, screen } from 'shared/testing/test-utils';
import { MakeListEmployeesPage } from './list-employees.factory';

describe('MakeListEmployeesPage', () => {
  it('should render without errors', async () => {
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
    expect(await screen.findByText(/gabriel santiago/i)).toBeInTheDocument();
  });
});
