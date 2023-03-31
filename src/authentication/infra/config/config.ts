import { PersistedUser } from 'authentication/domain/interfaces/user-storage.interface';
import { StoragePersistor } from 'shared/domain/interfaces/storage-persistor.interface';

interface authConfigInterface {
  persistor: null | StoragePersistor<PersistedUser>;
}

export const authConfig: authConfigInterface = {
  persistor: null,
};
