import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/storeHooks";
import { handleValidationOF } from "@/validation/validateFormData";
import { batchSchema } from "@/validation/school.validator";
import { handleApi, HandleApiOptions } from "@/api/global.api";
import { useAppNavigate } from "@/hooks/navigate.hook";
import InputField from "@/components/inputField";
import { ITeacherBio } from "@/interfaces/ITeacher";


const AddBatch = () => {
    const [form, setForm] = useState({
        name: "",
        code: "",
        center: "",
        counselor: "Murali Manohar",
        startDate: "",
        endDate: "",
        isActive: true,
    });
    const [unAssignedTeachers,setUnAssignedTeachers]=useState<ITeacherBio[]|[]>([]);

    const {goBack}=useAppNavigate()

    useEffect(()=>{
            (async()=>{
                const config:HandleApiOptions<null>={
                            method:"get",
                            endPoint:"/teacher/all/unAssigned",
                            payload:null,
                            headers:{role:"School"}
                    }
    
                const res= await handleApi<null,ITeacherBio[]>(config);
                const teachers=res.data.data
                setUnAssignedTeachers(teachers);
                return true;
            })();
        },[]);

    

    const [error, setError] = useState<string | null>(null);
    // const batchReduxStore=useAppSelector((state)=>state.batch);
    const centersReduxStore=useAppSelector((state)=>state.center);

  /* ---------- Handle Change ---------- */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        const spanTag=document.getElementById(name);
        if(spanTag){
            spanTag.textContent="";
        }

        setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };

    /* ---------- Submit ---------- */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid=handleValidationOF(batchSchema,form);
        if(!isValid.success) return isValid.success;

        //fetchData
        const config:HandleApiOptions<object>={
            method:"post",
            endPoint:"/school/batches/add",
            payload:form,
            headers:{role:"school"}
        }

        await handleApi(config);
        goBack();
        setError("");
    };

    return (
        <div className="p-6 bg-[#fbf3f1] min-h-screen">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Add Batch
        </h1>
        <p className="text-sm text-gray-500 mb-6">
            Create a new batch under a center
        </p>

        {/* Error */}
        {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {/* Form */}
        <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-md p-6 max-w-5xl"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Batch Name */}
            
            <InputField 
                type="string" 
                value={form.name} 
                onChange={handleChange} 
                label='Batch Name *'
                placeholder='e.g. 6 A'
                name="name"
            />

            {/* Batch Code */}
            <InputField 
                type="string" 
                value={form.code} 
                onChange={handleChange} 
                label='Batch Code *'
                name="code"
                placeholder='e.g. CODE12'
            />


            {/* Center */}
            <div>
                <label className="block text-sm font-medium mb-1">
                Center *
                </label>
                <select
                name="center"
                value={form.center}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-700 outline-none"
                >
                <option value="">Select center</option>
                {centersReduxStore.centers?.map((batch)=>{
                    return (<option value={batch?._id}>{batch?.name}</option>)

                })}
                </select>
                <span id="center" className="text-red-500 errorDisplay"></span>
            </div>


            {/* Batch Counselor */}
            <div>
                <label className="block text-sm font-medium mb-1">
                Batch Counselor
                </label>
                <select
                name="counselor"
                value={form.counselor}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-700 outline-none"
                >
                <option value="">Select counselor</option>
                {unAssignedTeachers?.map((counselor:ITeacherBio)=>{
                    return (
                        <option value={counselor?._id}>
                            {counselor?.firstName} {counselor?.lastName}
                        </option>
                    )
                })}
                </select>
                <span id="counselor" className="text-red-500 errorDisplay"></span>
            </div>

            {/* Start Date */}
            <InputField 
                type="date" 
                value={form.startDate} 
                onChange={handleChange} 
                label='Start Date *'
                placeholder='e.g. 6 A'
                name="startDate"
            />


            {/* End Date */}
            <InputField 
                type="date" 
                value={form.endDate} 
                onChange={handleChange} 
                label='End Date *'
                placeholder='e.g. 6 A'
                name="endDate"
            />


            {/* Active Toggle */}
            <div className="flex items-center gap-3">
                <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="accent-green-700"
                />
                <span className="text-sm">Is Active</span>
            </div>

            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-8">
            <button
                type="button"
                className="px-6 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-100"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-6 py-2 bg-green-700 text-white rounded-md text-sm hover:bg-green-800"
            >
                Save Batch
            </button>
            </div>
        </form>
        </div>
    );
};

export default AddBatch;
