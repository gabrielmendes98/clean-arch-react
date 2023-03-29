import { BrowserRouter } from 'react-router-dom';
import { UserContext } from 'authentication/infra/providers/user.provider';
import { render, screen } from 'shared/testing/test-utils';
import { MakeListEmployeesContainer } from '../list-employees.factory';

describe('MakeListEmployeesContainer', () => {
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
          <MakeListEmployeesContainer />
        </BrowserRouter>
      </UserContext.Provider>,
    );
    expect(await screen.findByText(/gabriel santiago/i)).toBeInTheDocument();
  });
});
