import { useAppSelector } from '@/hooks/useStoreHooks';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const path=window.location.pathname;
const parentPath=path.split('/')[1];

const ProtectedRoute = ({ redirectPath = `/${parentPath}/login` }: ProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.currentUser);

  if (!user || Object.keys(user).length<=0) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};


export default ProtectedRoute;
