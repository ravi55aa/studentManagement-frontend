import React,{useState} 
    from "react";    
import { school_Register_SchemaFor_Address } 
    from "@/constants/createSchool";
import { useNavigate } 
    from "react-router-dom";
import InputField 
    from "@/components/inputField";
import { addressValidate } 
    from "@/validation/school.validator";
import { handleValidationOF } 
    from "@/validation/validateFormData";
import { handleAddressCreateSchoolApi } 
    from "@/api/school.api";
import { useAppHandleInputChange as _useAppHandleInputChange  } from "@/hooks/useHandleInputChange";



export default function AddAddress() {

    const [formData,setFormData]=useState({
                street:"",
                    city: "",
                        state: "",
                            zip: "",
                                country: null,
    });

    const navigate
        = useNavigate();
    


    const handleOnSubmit = 
            async(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                
                const isValidated = 
                    handleValidationOF(
                        addressValidate,formData);
                    //validateMethod(Schema,data)
                
                if(!isValidated.success){return isValidated.success;}
    
                const res = 
                    await handleAddressCreateSchoolApi(formData);
                    console.log(res);
                if(!res.success){return res.success;}
    
                navigate("/school/register/uploadDocuments");
                return res.success;
        }




    return (
        <div className="flex justify-center items-center min-h-screen bg-white px-4">
        <div className="w-full max-w-md">

            {/* Heading */}
            <h1 className="text-3xl font-bold text-center mb-2">
            Add School Address
            </h1>
            <p className="text-center text-gray-600 mb-8">
            Please enter your school location details.
            </p>

            {/* Form */}
            <form onSubmit={handleOnSubmit} className="space-y-4">
                
                
                <div className="flex flex-col gap-4">
                {school_Register_SchemaFor_Address.map((ele,i)=>{
                    return (
                    <InputField 
                    key={i}
                    uniqueKey={ele.name+i+i}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{_useAppHandleInputChange(e,setFormData)}}
                    name={ele.name}
                    type={ele.type}
                    placeholder={ele.placeholder}
                    />
                )})}
                </div>


            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
                Next
            </button>
            </form>

        </div>
        </div>
    );
}
