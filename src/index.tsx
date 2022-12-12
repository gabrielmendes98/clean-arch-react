import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from './shared/user-interface/routes/router';
import './shared/infra/styles/global.scss';
import { UserProvider } from './shared/infra/providers/user.provider';
import { makeStoragePersistor } from './shared/infra/factories/storage-persistor.factory';
import { PersistedUser } from './shared/application/user-storage.port';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const persistor = makeStoragePersistor<PersistedUser>();

root.render(
  <UserProvider persistor={persistor}>
    <Router />
    <ToastContainer position="top-right" />
  </UserProvider>,
);
