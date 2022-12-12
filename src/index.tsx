import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from './shared/user-interface/routes/router';
import './shared/infra/styles/global.scss';
import { UserProvider } from './shared/infra/providers/user.provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <UserProvider>
    <Router />
    <ToastContainer position="top-right" />
  </UserProvider>,
);
