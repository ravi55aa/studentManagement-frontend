import { IAcademicYear } from "@/interfaces/ISchool";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppNavigate } from "@/hooks/useNavigate.hook"; 
import { toast } from "react-toastify";
import { _useFormatDateForInput } from "@/hooks/useDateFormata";
import {InputField} from "@/components";
import { handleValidationOF } from "@/validation/validateFormData";
import { schoolAcademicYearSchema } from "@/validation/school.validator";
import FormActions from "@/components/FormAction";
import { AcademicYearService } from "@/api/Services/year.service";
import { toggleAcademicLoading } from "@/utils/Redux/Reducer/schoolYearReducer";
import { useAppDispatch } from "@/hooks/useStoreHooks";


const EditAcademicYear = () => {

    const {id}=useParams();
    const [form, setForm] = useState<IAcademicYear>();
    const [error, setError] = useState<string>("");
    const {goBack}=useAppNavigate();
    const dispatch=useAppDispatch();

    useEffect(()=>{
        const fetchYear=async()=>{
            dispatch(toggleAcademicLoading(true));
            const res=await AcademicYearService.get(id);
            
            if(!res.success){
                toast.error(res.error.message);
                return res.success;
            }
            
            dispatch(toggleAcademicLoading(false));
            setForm(res.data?.data);
            _useFormatDateForInput(res.data.data.endDate);  
            return true;
        }
        fetchYear();
    },[id]);

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

        const isValid = handleValidationOF(schoolAcademicYearSchema,form);
        
        if(!isValid.success){
            setError("VALIDATION ERROR");
            return false;
        }
        const res=await AcademicYearService.edit(id,form);

        if(!res.success ){
            toast.error(res.error.message);
            return res.success;
        }
        
        setError("");
        toast.success("updated Successfully");
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
            <FormActions submitLabel="Save Academic Year" onCancel={goBack}  submitType="submit"/>
        </form>
        </div>
    );
};

export default EditAcademicYear;
