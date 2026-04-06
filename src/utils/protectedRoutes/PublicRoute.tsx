import { useAppSelector } from '@/hooks/useStoreHooks';
import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
  redirectPath?: string;
}

const path=window.location.pathname;
const parentPath=path.split('/')[1];

const PublicRoute = ({ redirectPath = `/${parentPath}/dashboard` }: PublicRouteProps) => {
  const { user } = useAppSelector((state) => state.currentUser);

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
