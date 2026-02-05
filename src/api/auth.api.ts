import { axiosBaseURL } from "@/config/axios.config"

export const handleAdminRegister = async (payload:FormData) => {
    try {
        const { data } = await axiosBaseURL.post("/auth/admin/register", payload, {
            headers: {
                "role": "Admin"
            }
        });

        return { success: true, data };
    } 
    catch (error) {
        console.error("Register error:", error.response?.data || error.message);

        return {
        success: false,
        error: error.response?.data || error.message
        };
    }
};

export const handleAdminSignIn=async(payload:object)=>{
    try{
        const response=await axiosBaseURL.post("/auth/admin/login",payload,{
            headers:{role:"Admin"}
        });
        return {success:true,data:response?.data};
    } catch(error){
        console.error("Register error:", error.response?.data || error.message);

        return {
        success:false,
        error:error.response?.data||error.message
        }
    }
}
