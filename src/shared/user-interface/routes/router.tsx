import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MakeRegisterEmployeePage } from 'employee/user-interface/pages/register-employee/register-employee.factory';
import { MakeHome } from 'static-pages/home/home.factory';
import { MakeListEmployeesPage } from 'employee/user-interface/pages/list-employees/list-employees.factory';
import { MakeUpdateEmployeePage } from 'employee/user-interface/pages/update-employee/update-employee.factory';
import { MakeLoginPage } from 'authentication/user-interface/pages/login/login.factory';
import { MakeSignUpPage } from 'authentication/user-interface/pages/sign-up/sign-up.factory';
import { PAGES } from 'shared/domain/constants/pages';
import { MainLayout } from 'shared/user-interface/components/layouts/main/main.layout';
import { useUserStorage } from 'shared/infra/adapters/user-storage.adapter';
import { ProtectedRoute } from './ProtectedRoute';

export const Router = () => {
  const userStorage = useUserStorage();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} path="/">
          <Route path="" element={<MakeHome />} />
          <Route path={PAGES.LOGIN} element={<MakeLoginPage />} />
          <Route path={PAGES.SIGN_UP} element={<MakeSignUpPage />} />
          <Route element={<ProtectedRoute userStorage={userStorage} />}>
            <Route
              path={PAGES.REGISTER_EMPLOYEES}
              element={<MakeRegisterEmployeePage />}
            />
            <Route
              path={PAGES.LIST_EMPLOYEES}
              element={<MakeListEmployeesPage />}
            />
            <Route
              path={PAGES.UPDATE_EMPLOYEE(':id')}
              element={<MakeUpdateEmployeePage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
