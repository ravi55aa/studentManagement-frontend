import { IOtp } from "@/pages/Auth/ForgotPassword/Otp.page"
import { HandleApiOptions,handleApi } from "../global.api"
import { forgotPassword } from "@/constants/routes.contants"

export class AuthService {
    static async verifyEmail(email:string){
        const config:HandleApiOptions<object>={
                    method:"post",
                    endPoint:forgotPassword.emailVerify,
                    payload:{email:email,model:"Admin"},
                    headers:{role:"Admin"}
        }
        
        return await handleApi<object, IOtp>(config);
    }

    static async generateOtp(id:string){
        const config:HandleApiOptions<null>={
                    method:"get",
                    endPoint:`${forgotPassword.generateOtp}/${id}`,
                    headers:{role:"Admin"}
                }
        return await handleApi<null,IOtp>(config);
    }

    static async verifyOtp(genOtp:string,formOtp:string,id:string){
        const config:HandleApiOptions<object>={
                    method:"post",
                    endPoint:`${forgotPassword.verifyOtp}/${id}`,
                    payload:{generatedOtp:genOtp,userEnteredOtp:formOtp},
                    headers:{role:"Admin"}
            }
        return await handleApi(config);
    }

    static async updatePassword(id:string,newPassword:string){
        const config: HandleApiOptions<object> = {
                    method: "patch",
                    endPoint: `${forgotPassword.updatePassword}/${id}`,
                    payload: { newPassword: newPassword,modelName:"Admin" },
                    headers: { role: "Admin" },
                };
        
        return await handleApi(config);
    }
}