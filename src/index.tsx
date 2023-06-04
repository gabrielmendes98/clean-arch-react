/* istanbul ignore file */
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sentryInit } from 'sentry.config';
import { Router } from './shared/user-interface/routes/router';
import './shared/user-interface/styles/global.scss';
import { UserProvider } from './user/infra/providers/user.provider';
import { PersistedUser } from './user/domain/interfaces/user-storage.interface';
import { StoragePersistorFactory } from './shared/infra/factories/storage-persistor.factory';

sentryInit();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const userPersistor = StoragePersistorFactory.create<PersistedUser>();

root.render(
  <UserProvider persistor={userPersistor}>
    <Router />
    <ToastContainer position="top-right" />
  </UserProvider>,
);
