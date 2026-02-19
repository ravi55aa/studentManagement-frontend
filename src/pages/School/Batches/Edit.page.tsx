import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { handleValidationOF } from "@/validation/validateFormData";
import { batchSchema } from "@/validation/school.validator";
import { handleApi, HandleApiOptions } from "@/api/global.api";
import { useParams } from "react-router-dom";
import { IBatches } from "@/interfaces/ISchool";
import { useAppNavigate } from "@/hooks/useNavigate.hook";
import { _useFormatDateForInput } from "@/hooks/useDateFormata";
import {InputField} from "@/components";

const EditBatch = () => {
    const [form, setForm] = useState({
        name: "",
        code: "",
        center: "",
        counselor: "Murali Manohar",
        startDate: "",
        endDate: "",
        isActive: true,
    });

    const {id}=useParams();
    const {goBack}=useAppNavigate();

    useEffect(()=>{
        const fetchBatchById=async()=>{
            const config:HandleApiOptions<null>={
                method:"get",
                endPoint:`/school/batches/${id}`,
                headers:{role:"School"}
            }

            const res=await handleApi<null,Partial<IBatches>>(config);
            
            const batchData=res?.data?.data;
            console.log(batchData);

            setForm({
                name:batchData?.name ||"",
                code:batchData?.code || "",
                center:batchData?.center|| "" ,
                counselor: "Murali Manohar",
                startDate:_useFormatDateForInput(batchData?.schedule.startTime) || "",
                endDate:_useFormatDateForInput(batchData?.schedule.endTime) || "",
                isActive:batchData?.status=="active" ?true:false,
            });
        }
        fetchBatchById();
    },[]);

    const [error, setError] = useState<string | null>(null);
    //const batchReduxStore=useAppSelector((state)=>state.batch);
    const centerReduxStore=useAppSelector((state)=>state.center);

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
        if(!isValid.success){
            console.log("error",isValid.error);
            return isValid.success;
        }

        //fetchData
        const config:HandleApiOptions<object>={
            method:"put",
            endPoint:`/school/batches/edit/${id}`,
            payload:form,
            headers:{role:"school"}
        }

        await handleApi(config);

        setError(null);
        goBack();
        return true;
    };

    return (
        <div className="p-6 bg-[#fbf3f1] min-h-screen">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Edit Batch
        </h1>
        <p className="text-sm text-gray-500 mb-6">
            Edit a batch under a center
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
            />
            
            {/* Batch Code */}
            <InputField 
                type="string" 
                value={form.code} 
                onChange={handleChange} 
                label='Batch Code *'
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
                {centerReduxStore.centers?.map((batch)=>{
                    return (<option value={batch?._id}>{batch?.name}</option>)

                })}
                </select>
                <span id="center" className="errorDisplay text-sm text-red-500"> </span>
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
                <option value="1">Kristin Watson</option>
                <option value="2">Jane Cooper</option>
                </select>
                <span id="counselor" className="errorDisplay text-sm text-red-500"> </span>
            </div>

            {/* Start Date */}
            <InputField 
                type="date" 
                value={form.startDate} 
                onChange={handleChange} 
                label='Start Date *'
                placeholder='e.g. 6 A'
            />

            {/* End Date */}
            <InputField 
                type="date" 
                value={form.endDate} 
                onChange={handleChange} 
                label='End Date *'
                placeholder='e.g. 6 A'
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
                Edit Batch
            </button>
            </div>
        </form>
        </div>
    );
};

export default EditBatch;
