import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppSelector } from "./useStoreHooks";
import { NotificationService } from "@/api/Services/notification.service";
import { toast } from "react-toastify";

export function useCommonMethods () {

    const {user}=useAppSelector((state)=>state.currentUser);
    const navigate=useNavigate();
    
    const useHandleLogout=async(to:string)=>{
        const result = await Swal.fire({
            title: 'Logout from page?',
            text: 'This action cannot be undone!',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Logout',
        });
    
        if (!result.isConfirmed) {
            return;
        }

        localStorage.clear();
        window.location.reload();

        navigate(`/${to}/login`);
    }

    return {
        useHandleLogout,
    }
}