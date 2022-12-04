import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MakeRegisterEmployeePage } from 'employee/user-interface/pages/register-employee/register-employee.factory';
import { MakeHome } from 'static-pages/home/home.factory';
import { MakeListEmployeesPage } from 'employee/user-interface/pages/list-employees/list-employees.factory';
import { MakeUpdateEmployeePage } from 'employee/user-interface/pages/update-employee/update-employee.factory';
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
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
