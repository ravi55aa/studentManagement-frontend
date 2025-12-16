import { IAddress, ISchoolFormData } 
    from "@/interfaces/IRegister"
import { axiosBaseURL } 
    from "@/config/axios.config"
import { IResponse } from "@/interfaces/IResponse";




export const returnErrorObj=(err)=>{
    console.error(err,{cause:err.message});
    return {
        success:false,
        message:"something",
        data:null,
        error:err
    }
}




export const handleMetaDataCreateSchoolApi = 
    async (formData:ISchoolFormData):Promise<IResponse>=>
        {
        try {
            const res:IResponse = 
                await axiosBaseURL.post("/school/createSchool",formData,
                    { headers: { "role": "admin"}});
                
            return res.data;
        } catch(err){
            console.error(err,{cause:err.message});

            return returnErrorObj(err);
        }
    }



export const handleAddressCreateSchoolApi = 
    async (formData:IAddress):Promise<IResponse>=>
        {
        try {
            const res:IResponse = 
                await axiosBaseURL.post("/school/createSchool/addAddress",formData,
                    { headers: { "role": "admin"}});
                
            return res.data;
        } catch(err){
            console.error(err,{cause:err.message});

            return returnErrorObj(err);
        }
    }



export const handleDocsUploadCreateSchoolApi = 
    async (formData):Promise<IResponse>=>
        {
        try {
            const res:IResponse = 
                await axiosBaseURL.post("/school/createSchool/uploadDocument",formData,
                    { headers: 
                        { "role": "admin","Content-Type":"multipart/formData"}
                    });
                
            return res.data;
        } catch(err){
            console.error(err,{cause:err.message});

            return returnErrorObj(err);
        }
    }



    export const handleSchoolSignIn=async(payload:object)=>{
        try{

            console.log(payload);
            const response=await axiosBaseURL.get("/school/register",{
                params:payload,
                headers:{role:"admin"}
            });

            return {success:true,data:response?.data};
        } catch(error){
            console.error("SignIn error:", error.response?.data || error.message);

            return {
            success:false,
            error:error.response?.data||error.message
            }
        }
    }
