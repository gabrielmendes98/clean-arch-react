import { User } from 'shared/domain/entities/user.entity';
import { Email } from 'shared/domain/value-objects/email.vo';
import { UniqueEntityId } from 'shared/domain/value-objects/unique-entity-id.vo';
import { userStorageServiceMock } from 'shared/testing/mocks/user-storage.mock';
import { render, screen } from 'shared/testing/test-utils';
import { Home } from './home.view';

describe('Home', () => {
  it('should show welcome message without user name when has no user', () => {
    render(<Home userStorage={userStorageServiceMock} />);
    expect(
      screen.getByText(/welcome to clean arch react application/i),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('welcome-user-name')).not.toBeInTheDocument();
  });

  it('should show welcome message with user name when has user', () => {
    userStorageServiceMock.user = new User(
      new UniqueEntityId('ce734f82-2fac-4845-b394-66bd67e6e271'),
      new Email('some@email.com'),
      'eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJjbGVhbi1hcmNoLXJlYWN0IiwiaWQiOiJjZTczNGY4Mi0yZmFjLTQ4NDUtYjM5NC02NmJkNjdlNmUyNzEiLCJleHAiOjE2NzA0MTQ5MjAsImlhdCI6MTY3MDQxNDkyMCwiZW1haWwiOiJmYWtlZW1haWxAZ21haWwuY29tIn0.wBOgBI4olSa8LzovYjDhea5I_vO0HTKR2vq5K1rG3AI',
      'some name',
    );

    render(<Home userStorage={userStorageServiceMock} />);
    expect(
      screen.getByText(/welcome to clean arch react application/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/some name/i)).toBeInTheDocument();
  });
});
