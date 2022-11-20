import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './shared/user-interface/routes/router';
import './shared/infra/styles/global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
