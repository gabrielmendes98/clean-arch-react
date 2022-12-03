import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MakeRegisterEmployeePage } from 'employee/user-interface/pages/register-employee/register-employee.factory';
import { makeHome } from 'static/user-interface/pages/home/home.factory';
import { MakeListEmployeesPage } from 'employee/user-interface/pages/list-employees/list-employees.factory';
import { PAGES } from 'shared/domain/constants/pages';
import { MainLayout } from 'shared/user-interface/components/layouts/main/main.layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: makeHome(),
      },
      {
        path: PAGES.REGISTER_EMPLOYEES,
        element: <MakeRegisterEmployeePage />,
      },
      {
        path: PAGES.LIST_EMPLOYEES,
        element: <MakeListEmployeesPage />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
