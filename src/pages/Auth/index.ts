import { axiosBaseURL } from "@/config/axios.config";


export {default as EmailVerify} from "./ForgotPassword/EmailVerify.page";

export {default as OTP} from "./ForgotPassword/Otp.page";

export {default as PasswordReset} from "./ForgotPassword/PasswordReset.page";




export const handleApi = 
async (endPoint:string,payload:FormData):Promise<void> =>
    {
    try{
        const data =await axiosBaseURL.post(endPoint,payload);
        console.log(data);
        return;

    } catch(err){
        throw new Error(`axios error ${err.message}`);
    }
}




