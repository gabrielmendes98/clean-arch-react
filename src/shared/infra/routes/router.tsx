import { makeHome } from 'home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PAGES } from 'shared/constants/pages';
import { MainLayout } from 'shared/presentation/components/layouts/main';

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
        element: makeHome(),
      },
      {
        path: PAGES.LIST_EMPLOYEES,
        element: makeHome(),
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
