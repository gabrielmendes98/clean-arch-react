import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Router } from './shared/user-interface/routes/router';
import './shared/infra/styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from 'shared/infra/storage/user/user.provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <UserProvider>
    <Router />
    <ToastContainer position="top-right" />
  </UserProvider>,
);
