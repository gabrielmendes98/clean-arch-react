import { makeEmployeeForm } from 'employee/form';
import { makeHome } from 'home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PAGES } from 'shared/helpers/constants/pages';
import { MainLayout } from '../presenters/layouts/main';

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
        element: makeEmployeeForm(),
      },
      {
        path: PAGES.LIST_EMPLOYEES,
        element: makeHome(),
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
