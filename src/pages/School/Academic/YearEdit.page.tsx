import { handleApi,HandleApiOptions } from "@/api/global.api";
import { IAcademicYear } from "@/interfaces/ISchool";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppNavigate } from "@/hooks/navigate.hook"; 
import { toast } from "react-toastify";
import { _useFormatDateForInput } from "@/hooks/dateFormata";
import InputField from "@/components/inputField";
import { handleValidationOF } from "@/validation/validateFormData";
import { schoolAcademicYearSchema } from "@/validation/school.validator";

//validation and handleApi
const EditAcademicYear = () => {

    const {id}=useParams();
    const [form, setForm] = useState<IAcademicYear>();
    const [error, setError] = useState<string>("");
    const {goBack}=useAppNavigate();

    useEffect(()=>{
        const fetchYear=async()=>{
            const config:HandleApiOptions<null>={
                endPoint:`/school/academicYears/${id}`,
                method:"get",
                headers:{role:"school"},
            }
            const res=await handleApi<null,IAcademicYear>(config);
            setForm(res.data?.data);
            _useFormatDateForInput(res.data.data.endDate);  
            return true;
        }
        fetchYear();
    },[]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;

        const spanTag=document?.getElementById(name);
        if(spanTag){
            spanTag.innerText="";
        }
        setError("")

        setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked ? "active":"inactive" : value,
        }));
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setError("")
        console.log("@yearEdit form",form);

        const isValid = handleValidationOF(schoolAcademicYearSchema,form);
        
        if(!isValid.success){
            setError("VALIDATION ERROR");
            return false;
        }

        const config:HandleApiOptions<object>={
                endPoint:`/school/academicYears/edit/${id}`,
                method:"put",
                payload:form,
                headers:{role:"school"},
            }
        const res=await handleApi<object,null>(config);

        if(res.success ){
            toast.success("updated Successfully");
        }

        setError("");

        goBack();
        return true;
    };

    return (
        <div className="p-6 bg-white min-h-screen">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Edit Academic Year
        </h1>
        <p className="text-sm text-gray-500 mb-6">
            Update academic year details
        </p>
        <p className="text-sm text-red-500 mb-6">
            {error}
        </p>

        {/* Form */}
        <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-md p-6 max-w-4xl"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* <div>
                <label className="block text-sm font-medium mb-1">
                
                </label>
                <input
                name="year"
                type="year"
                value={form?.year}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-700 outline-none"
                />
            </div> */}

            <InputField label="Academic Year" name="year" type="year" 
            value={form?.year} onChange={handleChange}  />

             <InputField label="Code *" name="code" type="string" 
            value={form?.code} onChange={handleChange}  />

            
            <InputField label="Start Date" name="startDate" type="date" 
            value={_useFormatDateForInput(form?.startDate)} 
            onChange={handleChange}  />

            <InputField label="End Date" name="endDate" type="date" 
            value={_useFormatDateForInput(form?.endDate)} 
            onChange={handleChange}  />

            <div className="flex items-center gap-3">
                <input
                type="checkbox"
                name="status"
                checked={form?.status=="active"?true:false}
                onChange={handleChange}
                className="accent-green-700"
                />
                <span className="text-sm">Active</span>
            </div>

            </div>

            

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-8">
            <button
                onClick={goBack}
                type="button"
                className="px-6 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-100"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-6 py-2 bg-green-700 text-white rounded-md text-sm hover:bg-green-800"
            >
                Update Academic Year
            </button>
            </div>
        </form>
        </div>
    );
};

export default EditAcademicYear;
