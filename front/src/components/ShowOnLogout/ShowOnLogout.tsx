import { AppStore } from '@/models';
import { useSelector } from 'react-redux';

export interface ShowOnLogoutInterface {}

const ShowOnLogout = ({ children }: any) => {
  const userState = useSelector((store: AppStore) => store.user);
  return userState.email.length > 0 ? children : null;
};

export default ShowOnLogout;
