import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainLayout } from 'shared/presentation/components/layouts/main';
import { Router } from './shared/infra/routes/router';
import './shared/presentation/styles/global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <MainLayout>
      <Router />
    </MainLayout>
  </React.StrictMode>,
);
