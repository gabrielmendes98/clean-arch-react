import { useNavigate } from 'react-router-dom';

export const useNavigation = () => ({
  navigate: useNavigate(),
});
