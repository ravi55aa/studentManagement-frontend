import { useAppSelector } from '@/hooks/useStoreHooks';
import { Navigate, Outlet, useLocation } from "react-router-dom";


const PublicRoute = () => {

  const { user } = useAppSelector((state) => state.currentUser);

  const location = useLocation();

  const parentPath = location.pathname.split('/')[1];
  
  let redirectPath = `/${parentPath}/dashboard`;
  
  if(parentPath=='login'){
    redirectPath='/dashboard'
  }

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};


export default PublicRoute;
