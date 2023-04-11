import { UserFactory } from 'authentication/domain/factories/user.factory';
import { userStorageServiceMock } from 'shared/testing/mocks/user-storage.mock';
import { render, screen } from 'shared/testing/test-utils';
import { Home } from './home.container';

describe('Home', () => {
  it('should show welcome message without user name when has no user', () => {
    render(<Home userStorage={userStorageServiceMock} />);
    expect(
      screen.getByText(/Bem-vindo\(a\) à aplicação Clean Arch React/i),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('welcome-user-name')).not.toBeInTheDocument();
  });

  it('should show welcome message with user name when has user', () => {
    userStorageServiceMock.user = UserFactory.create({
      email: 'some@email.com',
      id: 'ce734f82-2fac-4845-b394-66bd67e6e271',
      name: 'some name',
      token:
        'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
    });

    render(<Home userStorage={userStorageServiceMock} />);
    expect(
      screen.getByText(/Bem-vindo\(a\) à aplicação Clean Arch React/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/some name/i)).toBeInTheDocument();
  });
});
