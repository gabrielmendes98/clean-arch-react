import { useNavigate, useParams } from 'react-router-dom';
import { RouterService } from 'shared/domain/interfaces/router.interface';

export const useRouter = (): RouterService => ({
  navigate: useNavigate(),
  getUrlParams: useParams,
});
