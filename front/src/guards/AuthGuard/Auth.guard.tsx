import { AppStore, PrivateRoutes, PublicRoutes, User } from '@/models';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
export interface AuthInterface {}

interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = (
  <Navigate replace to={PrivateRoutes.PRIVATE} />
);

const AuthGuard = ({ privateValidation }: Props) => {
  const userState = useSelector((store: AppStore): User => store.user);
  return !!userState.email ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
};

export default AuthGuard;
