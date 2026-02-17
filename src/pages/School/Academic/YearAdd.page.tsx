import { handleApi, HandleApiOptions } from "@/api/global.api";
import { schoolAcademicYearSchema } from "@/validation/school.validator";
import { handleValidationOF } from "@/validation/validateFormData";
import { useState } from "react";
import { useAppNavigate } from "@/hooks/useNavigate.hook";
import { toast } from "react-toastify";
import InputField from "@/components/inputField"; 

const AddAcademicYear = () => {
    const [form, setForm] = useState({
        year: "",
        code: "",
        startDate: "",
        endDate: "",
        isActive: false,
        status:"active"
    });

    const {goBack}=useAppNavigate();

    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;
        const spanTag=document.getElementById(name);

        if(spanTag){
            spanTag.innerText="";
        }

        setError("");

        setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = handleValidationOF(schoolAcademicYearSchema,form);

        if(!isValid.success){
            setError("Validation Error...");
            console.log(isValid.error);
            return false;
        }
        
        const newStatus=form.isActive ? "active" : "inactive"
        setForm((prev) => ({
        ...prev,
        status: newStatus
        }));


        const config:HandleApiOptions<object>={
            method:"post",
            endPoint:"/school/academicYears/add",
            headers:{"Content-type":"application/json"},
            payload:form
        };

        const res=await handleApi(config);

        if(!res.success){
            setError(res?.error.message);
            console.log("@yearAdd response,",res);
            return false;
        }
        
        toast.success("New Year Created");
        goBack();
        setError(null);
        return true;
    };



    return (
        <div className="p-6 bg-white min-h-screen">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Add Academic Year
        </h1>
        <p className="text-sm text-gray-500 mb-6">
            Create a new academic year
        </p>

        {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {/* Form */}
        <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-md p-6 max-w-4xl"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Academic Year */}
            <InputField
                label="Academic Year *"
                name="year"
                type="year"
                value={form.year}
                onChange={handleChange}
            />


            {/* Code */}
            <InputField
                label="Code *"
                name="code"
                type="text"
                value={form.code}
                onChange={handleChange}
                placeholder="e.g. AY26"
            />

            {/* Start Date */}
            <InputField
                label="Start Date *"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                
            />

            {/* End Date */}
            <InputField
                label="End Date *"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
            
            />

            {/* Active */} 
            <div className="flex items-center gap-3">
                <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="accent-green-700"
                />
                <span className="text-sm">Set as Active Academic Year</span>
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
                Save Academic Year
            </button>
            </div>
        </form>
        </div>
    );
};

export default AddAcademicYear;
