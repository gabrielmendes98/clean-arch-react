import { useNavigate } from 'react-router-dom';
import { RouterService } from 'shared/application/router.port';

export const useRouter = (): RouterService => ({
  navigate: useNavigate(),
});
