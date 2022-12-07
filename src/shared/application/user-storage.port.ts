import { User } from 'shared/domain/entities/user.entity';

export interface UserStorageService {
  user: User | null;
  updateUser(user: User | null): void;
  removeUser(): void;
}