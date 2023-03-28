import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MakeHome } from 'static-pages/home/home.factory';
import { MakeLoginPage } from 'authentication/user-interface/factories/login.factory';
import { MakeSignUpPage } from 'authentication/user-interface/factories/sign-up.factory';
import { MakeRegisterEmployeePage } from 'employee/user-interface/factories/register-employee.factory';
import { MakeListEmployeesPage } from 'employee/user-interface/factories/list-employees.factory';
import { MakeUpdateEmployeePage } from 'employee/user-interface/factories/update-employee.factory';
import { useUserStorage } from 'shared/infra/hooks/use-user-storage.hook';
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
              element={<MakeRegisterEmployeePage />}
            />
            <Route
              path={pages.listEmployees}
              element={<MakeListEmployeesPage />}
            />
            <Route
              path={pages.updateEmployee(':id')}
              element={<MakeUpdateEmployeePage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
