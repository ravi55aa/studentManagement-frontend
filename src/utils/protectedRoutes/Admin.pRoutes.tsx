import { useAppSelector } from "@/hooks/useStoreHooks";
import { Navigate } from "react-router-dom";


export const RegisterProtectedRoute=({children})=>{
    
    // i can i do with the session by the way
    const {id,role}=useAppSelector((state)=>state.currentUser.user);

    return id&&role ? children : <Navigate to="/login" />
}
