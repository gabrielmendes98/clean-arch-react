import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MakeRegisterEmployeePage } from 'employee/user-interface/pages/register-employee/register-employee.factory';
import { MakeHome } from 'static-pages/home/home.factory';
import { MakeListEmployeesPage } from 'employee/user-interface/pages/list-employees/list-employees.factory';
import { MakeUpdateEmployeePage } from 'employee/user-interface/pages/update-employee/update-employee.factory';
import { MakeLoginPage } from 'authentication/user-interface/pages/login/login.factory';
import { MakeSignUpPage } from 'authentication/user-interface/pages/sign-up/sign-up.factory';
import { PAGES } from 'shared/domain/constants/pages';
import { MainLayout } from 'shared/user-interface/components/layouts/main/main.layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <MakeHome />,
      },
      {
        path: PAGES.REGISTER_EMPLOYEES,
        element: <MakeRegisterEmployeePage />,
      },
      {
        path: PAGES.LIST_EMPLOYEES,
        element: <MakeListEmployeesPage />,
      },
      {
        path: PAGES.UPDATE_EMPLOYEE(':id'),
        element: <MakeUpdateEmployeePage />,
      },
      {
        path: PAGES.LOGIN,
        element: <MakeLoginPage />,
      },
      {
        path: PAGES.SIGN_UP,
        element: <MakeSignUpPage />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
