import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MakeLoginContainer } from 'authentication/user-interface/factories/login.factory';
import { MakeSignUpContainer } from 'authentication/user-interface/factories/sign-up.factory';
import { MakeRegisterEmployeeContainer } from 'employee/user-interface/factories/register-employee.factory';
import { MakeListEmployeesContainer } from 'employee/user-interface/factories/list-employees.factory';
import { MakeUpdateEmployeeContainer } from 'employee/user-interface/factories/update-employee.factory';
import { MakeHomeContainer } from 'static-pages/home/factories/home.factory';
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
          <Route path="" element={<MakeHomeContainer />} />
          <Route path={pages.login} element={<MakeLoginContainer />} />
          <Route path={pages.signUp} element={<MakeSignUpContainer />} />
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
