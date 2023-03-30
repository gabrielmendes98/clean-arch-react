/* istanbul ignore file */
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from './shared/user-interface/routes/router';
import './shared/user-interface/styles/global.scss';
import { UserProvider } from './authentication/infra/providers/user.provider';
import { PersistedUser } from './authentication/domain/interfaces/user-storage.interface';
import { StoragePersistorFactory } from './shared/infra/factories/storage-persistor.factory';

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
