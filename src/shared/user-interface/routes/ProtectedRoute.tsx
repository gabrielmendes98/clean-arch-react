import { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserStorageService } from 'shared/application/user-storage.port';

type Props = {
  userStorage: UserStorageService;
  redirectPath?: string;
} & PropsWithChildren;

export const ProtectedRoute = ({
  userStorage,
  redirectPath = '/login',
  children,
}: Props) => {
  const { user } = userStorage;

  if (user === undefined) {
    return <div>loading...</div>;
  }

  if (user === null) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};
