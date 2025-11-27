import { handleAdminRegister } from "@/api/auth.api";
import { RegisterSchema } from "@/validation/register.schema";
import { ChangeEventHandler, useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom";


export interface FormDataShouldBe{
    name:string|null;
    email:string|null;
    password:string|null;
    reEnter:string|null;
    profile:File|null
}



const RegisterFormBody = () => {
    const [isSubmit,setSubmit]=useState(false);
    const [formData,setFormData]=useState<FormDataShouldBe>({
        name:"",
        email:"",
        password:"",
        reEnter:"",
        profile:null,
    });

    const navigate=useNavigate();

    useEffect(()=>{
        (async()=>{
            const convertedFD=new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if(key=="profile"){
                    convertedFD.append(key, formData.profile);
                } else{
                    convertedFD.append(key, value);
                }
            });

            const responseObj=await handleAdminRegister(convertedFD);
            if(responseObj.success){
                navigate("/school/create");
            } else {
                navigate("/login");
            }
        })();
    },[isSubmit]);

    const handleInputChange:ChangeEventHandler<HTMLInputElement>=(e)=>{
        //if profile i can i do it later
        e.preventDefault();

        const spanTags=document.getElementsByClassName("errorDisplay");
        for(const ele of Array.from(spanTags)){
            ele.textContent="";
        }

        const {name,value}=e.target;
        if(name=="profile"){
            return setFormData(
                (prev)=>({...prev,[name]:e.target.files[0]})
            );
        }

        return setFormData((prev)=>({...prev,[name]:value}));
    }

    const handleSubmit=(e: React.FormEvent<HTMLFormElement>):boolean=>{
        e.preventDefault();

        const isValidate=RegisterSchema.safeParse(formData);

        if(!isValidate.success){
            const errorObj=isValidate.error.format();
            for (const [key, val] of Object.entries(errorObj)) {

            if(typeof val === "object" && val !== null && "_errors" in val){
                
                const errorMessage = val?._errors?.[0] || "";
                
                if(key=="confirmPassword"){
                    document.getElementById("reEnter").textContent=errorMessage ?? "Dear Admin; password should match";
                }
    
                const errorElement = document.getElementById(key);
    
                if (errorElement) {
                    errorElement.textContent = errorMessage;
                }
            }

    }
            
            return isValidate.success;
        }

        setSubmit((prev)=>!prev);
        return true;
    }

    return (

        <form onSubmit={handleSubmit} >
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-start">
                    <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700 w-full"
                    />
                    <span id="name" className="text-red-500 errorDisplay"></span>
                </div>


                <div className="flex flex-col items-start">
                    <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700 w-full"
                    />
                    <span id="email" className="text-red-500 errorDisplay"></span>
                </div>

                    <div className="flex flex-col items-start"> 
                    <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700 w-full"
                    />
                    <span id="password" className="text-red-500 errorDisplay"></span>
                    </div>

                    <div className="flex flex-col items-start">
                    <input
                    type="password"
                    name="reEnter"
                    onChange={handleInputChange}
                    placeholder="Re-enter Password"
                    className="border w-full border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700"
                    />
                    <span id="reEnter" className="text-red-500 errorDisplay"></span>
                    </div>
                    

                    {/* Profile Pic Upload */}
                    <label className="text-left text-gray-600 text-sm">
                    Profile Picture
                    </label>
                    <input
                    type="file"
                    name="profile"
                    onChange={handleInputChange}
                    className="text-sm text-gray-600"
                    />

                    {/* Button */}
                    <button  
                    type="submit"
                    className="bg-[#1E822A] hover:bg-green-900 text-white py-2 rounded-md text-sm mt-2">
                    Register
                    </button>
            </div>
                </form>
    )
}

export default RegisterFormBody