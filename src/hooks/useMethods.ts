import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function useCommonMethods () {

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

        navigate(`/${to}/login`);
    }


    return {
        useHandleLogout
    }
}