import { useAppSelector } from '@/hooks/useStoreHooks';
import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
  redirectPath?: string;
}

const PublicRoute = ({ redirectPath = '/school/dashboard' }: PublicRouteProps) => {
  const { user } = useAppSelector((state) => state.currentUser);

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
