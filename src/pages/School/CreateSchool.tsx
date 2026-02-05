import React, { useState } 
    from "react";
import {ISchoolFormData} 
    from "@/interfaces/IRegister";
import { useNavigate } 
    from "react-router-dom";
import { fields, inputStyle } 
    from "@/constants/createSchool";
import { schoolMetaDataValidate } 
    from "@/validation/school.validator";
import { handleValidationOF } 
    from "@/validation/validateFormData";
import { handleMetaDataCreateSchoolApi } 
    from "@/api/school.api";




function CreateSchool() {
    
    const [formData, setFormData] = 
        useState<ISchoolFormData>({
            adminName: "",
                schoolName:"",
                    email: "",
                        password: "",
                            reEnter: "",
                                profile: null,
                                    phone:"",
        });

    const navigate
        = useNavigate();



    const handleInputChange=
            (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();

        
        const {name,value} = e.target;

        const spanTag = 
        document.getElementById(name);
        
        spanTag.textContent = "";

        if(name=="profile"){
            return setFormData(
                (prev)=>
                    ({...prev,[name]:e.target.files[0]}));
        }

        return setFormData((prev)=>({...prev,[name]:value}));
    }


    const handleOnSubmit = 
        async(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            
            const isValidated = 
                handleValidationOF(
                    schoolMetaDataValidate,formData);

            if(!isValidated.success)
                {return isValidated.success;}

            
            const res= 
                await handleMetaDataCreateSchoolApi(formData);
            
            if(!res.success) return res.success;

            navigate("/school/register/address");
            return res.success;
    }



    return (
        <div  
            className="min-h-screen flex items-center justify-center bg-white">
        <div 
            className="text-center w-full max-w-md px-4">
            
            {/* Heading */}
            <h1 
                className="text-3xl font-semibold 
                        text-gray-800 mb-4">
                Welcome, create your school account
            </h1>

            <p 
                className="text-gray-500 mb-10">
                It is our great pleasure to have 
                <br /> you on board!
            </p>

            {/* Form */}
            <form onSubmit={handleOnSubmit}>
            <div className="flex flex-col gap-4">

                {fields.map((ele,i)=>{
                return (<div 
                        key={ele.name+i} 
                        className="text-start">
                        <input
                            name={ele.name}
                            type={ele.type}
                            placeholder={ele.placeholder}
                            onChange={handleInputChange}
                            className={inputStyle}
                        />
                        <span id={ele.name} className="text-red-500 errorDisplay  ps-4"> 
                        </span>
                        </div>)
                })}


            <label 
            className="text-left text-gray-600 text-sm">
            School logo
            </label>
            <input
            type="file"
            name="profile"
            placeholder="School Logo"
            onChange={handleInputChange}
            className="text-sm text-gray-600"
            />

            </div>
            

            {/* Button */}
            <button 
            type="submit" 
            className="w-full mt-6 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition">
            Next
            </button>

            </form>

            
            <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-green-700 font-medium cursor-pointer">
                Sign up
            </a>
            </p>
        </div>
        </div>
    );
}

export default CreateSchool;