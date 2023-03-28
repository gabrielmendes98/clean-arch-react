import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MakeRegisterEmployeePage } from 'employee/user-interface/pages/register-employee/register-employee.factory';
import { MakeHome } from 'static-pages/home/home.factory';
import { MakeListEmployeesPage } from 'employee/user-interface/pages/list-employees/list-employees.factory';
import { MakeUpdateEmployeePage } from 'employee/user-interface/pages/update-employee/update-employee.factory';
import { MakeLoginPage } from 'authentication/user-interface/containers/login/login.factory';
import { MakeSignUpPage } from 'authentication/user-interface/containers/sign-up/sign-up.factory';
import { MainLayout } from 'shared/user-interface/components/layouts/main/main.layout';
import { useUserStorage } from 'shared/infra/adapters/user-storage.adapter';
import { pages } from 'shared/domain/config/pages';
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
