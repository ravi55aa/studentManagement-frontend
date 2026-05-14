import { useAppSelector } from '@/hooks/useStoreHooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {

  const { user } = useAppSelector((state) => state.currentUser);

  const location = useLocation();

  const parentPath = location.pathname.split('/')[1];
  
  let redirectPath = `/${parentPath}/login`;
  
  if(parentPath=='dashboard'){
    redirectPath='/login'
  }

  if (!user || Object.keys(user).length <= 0) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
