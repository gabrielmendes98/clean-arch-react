import { makeRegisterEmployeePage } from 'employee/user-interface/pages/create/factory';
import { makeHome } from 'home/user-interface/pages/home/factory';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
        element: makeRegisterEmployeePage(),
      },
      {
        path: PAGES.LIST_EMPLOYEES,
        element: makeHome(),
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
