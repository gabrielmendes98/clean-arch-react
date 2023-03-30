import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MakeLoginPage } from 'authentication/user-interface/factories/login.factory';
import { MakeSignUpPage } from 'authentication/user-interface/factories/sign-up.factory';
import { MakeRegisterEmployeeContainer } from 'employee/user-interface/factories/register-employee.factory';
import { MakeListEmployeesContainer } from 'employee/user-interface/factories/list-employees.factory';
import { MakeUpdateEmployeeContainer } from 'employee/user-interface/factories/update-employee.factory';
import { MakeHome } from 'static-pages/home/factories/home.factory';
import { useUserStorage } from 'authentication/infra/hooks/use-user-storage.hook';
import { pages } from 'shared/domain/config/pages';
import { MainLayout } from '../components/layouts/main/main.layout';
import { ProtectedRoute } from './ProtectedRoute';

export const Router = () => {
  const userStorage = useUserStorage();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} path="/">
          <Route path="" element={<MakeHome />} />
          <Route path={pages.login} element={<MakeLoginPage />} />
          <Route path={pages.signUp} element={<MakeSignUpPage />} />
          <Route element={<ProtectedRoute userStorage={userStorage} />}>
            <Route
              path={pages.registerEmployees}
              element={<MakeRegisterEmployeeContainer />}
            />
            <Route
              path={pages.listEmployees}
              element={<MakeListEmployeesContainer />}
            />
            <Route
              path={pages.updateEmployee(':id')}
              element={<MakeUpdateEmployeeContainer />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
