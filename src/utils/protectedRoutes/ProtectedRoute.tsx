import { useAppSelector } from "@/hooks/useStoreHooks";
import { Navigate, Outlet } from "react-router-dom";


interface ProtectedRouteProps {
    redirectPath?: string;
}

const ProtectedRoute = ({ redirectPath = "/school/login" }: ProtectedRouteProps) => {
    const { user } = useAppSelector((state) => state.currentUser);

    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;