import { handleAdminRegister } from "@/api/auth.api";
import { RegisterSchema } from "@/validation/register.schema";
import { ChangeEventHandler, useState } from "react"
import {  useNavigate } from "react-router-dom";
import { IFormdata } from "@/interfaces/IRegister";



const RegisterFormBody = () => {
    const [formData, setFormData] = useState<IFormdata>({
    name: "",
    email: "",
    password: "",
    reEnter: "",
    profile: null,

    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    });

    const navigate=useNavigate();

    const handleInputChange
        :ChangeEventHandler<HTMLInputElement>
            =(e)=>{
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

    const handleValidatePayload
        =():boolean=>
            {

        const isValidate=RegisterSchema.safeParse(formData);
        console.log("IsValidaexd");

        if(!isValidate.success){
            const errorObj = 
                isValidate.error.format();
            
            for (const [key, val] of Object.entries(errorObj)) {

                if(typeof val === "object" 
                    && val !== null 
                        && "_errors" in val){
                    
                    const errorMessage = val?._errors?.[0] || "";
                    
                    if(key=="confirmPassword"){
                        document.getElementById("reEnter1").textContent=errorMessage 
                            ?? "Dear Admin; password should match";
                    }
                    const errorElement = 
                        document.getElementById(key+"1");
                    

                    if (errorElement) {
                        errorElement.textContent = errorMessage;
                    }
                }
            }
        }

        return true;
    }

    const handleSubmit = 
        async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!handleValidatePayload()){
            return false;
        }

        const payload=new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if(key=="profile"){
                    payload.append(key, formData.profile);
                } else{
                    payload.append(key, value);
                }
            });

            const responseObj=await handleAdminRegister(payload);
            if(responseObj.success){
                navigate("/createSchool");
            } else {
                navigate("/register");
            }
            return responseObj.success;
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
                    <span id="name1" className="text-red-500 errorDisplay"></span>
                </div>


                <div className="flex flex-col items-start">
                    <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700 w-full"
                    />
                    <span id="email1" className="text-red-500 errorDisplay"></span>
                </div>

                    <div className="flex flex-col items-start"> 
                    <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700 w-full"
                    />
                    <span id="password1" className="text-red-500 errorDisplay"></span>
                    </div>

                    <div className="flex flex-col items-start">
                    <input
                    type="password"
                    name="reEnter"
                    onChange={handleInputChange}
                    placeholder="Re-enter Password"
                    className="border w-full border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700"
                    />
                    <span id="reEnter1" className="text-red-500 errorDisplay"></span>
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

                    {/* Phone */}
                    <div className="flex flex-col items-start">
                        <input
                            type="text"
                            name="phone"
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                            className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700 w-full"
                        />
                        <span id="phone1" className="text-red-500 errorDisplay"></span>
                    </div>

                    {/* Street */}
                    <div className="flex flex-col items-start">
                        <input
                            type="text"
                            name="street"
                            onChange={handleInputChange}
                            placeholder="Street address"
                            className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700 w-full"
                        />
                        <span id="street1" className="text-red-500 errorDisplay"></span>
                    </div>

                    {/* City */}
                    <div className="flex flex-col items-start">
                        <input
                            type="text"
                            name="city"
                            onChange={handleInputChange}
                            placeholder="City"
                            className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700 w-full"
                        />
                        <span id="city1" className="text-red-500 errorDisplay"></span>
                    </div>

                    {/* State */}
                    <div className="flex flex-col items-start">
                        <input
                            type="text"
                            name="state"
                            onChange={handleInputChange}
                            placeholder="State"
                            className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700 w-full"
                        />
                        <span id="state1" className="text-red-500 errorDisplay"></span>
                    </div>

                    {/* Zip */}
                    <div className="flex flex-col items-start">
                        <input
                            type="text"
                            name="zip"
                            onChange={handleInputChange}
                            placeholder="ZIP Code"
                            className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700 w-full"
                        />
                        <span id="zip1" className="text-red-500 errorDisplay"></span>
                    </div>

                    {/* Country */}
                    <div className="flex flex-col items-start">
                        <input
                            type="text"
                            name="country"
                            onChange={handleInputChange}
                            placeholder="Country"
                            className="border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700 w-full"
                        />
                        <span id="country1" className="text-red-500 errorDisplay"></span>
                    </div>



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

