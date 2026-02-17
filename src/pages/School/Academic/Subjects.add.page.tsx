// list the Batches and Year

import InputField from 
    "@/components/inputField";
import { schoolSubjectSchema } 
    from "@/validation/school.validator";
import { handleValidationOF } 
    from "@/validation/validateFormData";
import {  useState } 
    from "react";
import { HandleApiOptions,handleApi } 
    from "@/api/global.api";
import { useAppSelector,useAppDispatch } from "@/hooks/useStoreHooks";
import { toast } from "react-toastify";
import {useAppNavigate} from "@/hooks/useNavigate.hook";
//import { toggleBatchLoading } from "@/utils/Redux/Reducer/batchReducer";
import { toggleAcademicLoading } from "@/utils/Redux/Reducer/schoolYearReducer";
import { Select } from "@/components/Select";


enum subjectType {
    primary="theory",
    secondary="practical",
    both="both"
}
// enum subjectLevel {
//     primary="primary", 
//     secondary="secondary", 
//     higher_secondary="higher-secondary", 
//     degree="degree"
// }


const AddSubject = () => {
    const [form, setForm] = useState({
        name: "",
        code: "",
        className: "",
        type: "" as subjectType,
        maxMarks: 0,
        passMarks: 0,
        credits: 0,
        department: "",
        //level: "" as subjectLevel,
        academicYear: "",
        batchesToFollow: [] as string[],
        description: "",
        referenceBooks: [] as File[],
        status: "active",
    });
    const {goBack} =useAppNavigate();
    const dispatch=useAppDispatch();

    const [error, setError] = useState<string | null>(null);
    const batches=useAppSelector((state)=>state.batch);
    const year=useAppSelector((state)=>state.schoolYear);


    /* ---------- Handlers ---------- */
    const handleChange = (
        e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {

        const { name, value } = e.target;
        
        if(document.getElementById(name)){
            document.getElementById(name).innerText="";
        }

        setForm((prev) => ({ ...prev, [name]: value }));

    };

    const handleBatchToggle = (batchId: string) => {
    setForm((prev) => {
        const exists = prev.batchesToFollow.includes(batchId);

        return {
        ...prev,
        batchesToFollow: exists
            ? prev.batchesToFollow.filter((id) => id !== batchId)
            : [...prev.batchesToFollow, batchId],
        };
    });
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (!files) return;
    
            const fileArray = Array.from(files);
    
            //  validation 
            const invalid = fileArray.find(
            (file) => file.size > 3 * 1024 * 1024 // 3MB limit
            );
    
            if (invalid) {
            setError("File size must be less than 3 MB");
            return;
            }
            
            const updated = [...form.referenceBooks,...fileArray];
            setForm((prev) => ({ ...prev, referenceBooks: updated }));

            setError("");

            console.log("referenceBooks",form.referenceBooks)
    }


    const removeFile = (index: number) => {
        setForm((prev) =>({...prev,referenceBooks:prev.referenceBooks.filter((_, i) => i !== index)}));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(toggleAcademicLoading());
        
        //validate
        const payload={
            ...form,
            maxMarks:Number(form.maxMarks),
            passMarks:Number(form.passMarks),
            credits:Number(form.credits),
        }
        
        const validation=handleValidationOF(schoolSubjectSchema,payload);
        
        if(!validation.success){
            console.log("The validation. Error",validation.error);
            dispatch(toggleAcademicLoading());
            return false;
        }
        console.log("@subject.add.page",payload)

        setError(null);

        //formData.append()
        const formData=new FormData();
        
        for(const field in form){
            if(field=="referenceBooks"){
                form[field]?.forEach((ele)=>formData.append("docs",ele));
            } else {
                formData.append(field,form[field]);
            }
        }
        
        //api.call()
        const config:HandleApiOptions<object>={
            method:"post",
            endPoint:"/school/academic/subjects/add",
            payload:formData
        }
        
        const response=await handleApi(config);
        
        if(!response.success) return response.success;
        
        dispatch(toggleAcademicLoading());
        toast.success('New Subject Added',{draggable:true,});
        goBack();

        return;
    };



    return (
        <div className="p-6 bg-white min-h-screen">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Add Subject
        </h1>
        <p className="text-sm text-gray-500 mb-6">
            Create a new academic subject
        </p>

        {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {/* Form */}
        <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-md p-6 max-w-5xl"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <InputField
                label="Subject Name *"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Mathematics"
            />

            {/* Code */}
            <InputField
                label="Code *"
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="MATH101"
            />

            {/* Class */}
            <InputField
                label="Class"
                name="className"
                value={form.className}
                onChange={handleChange}
                placeholder="Class 10"
            />

            {/* Type */}
            <Select
                label="Type *"
                name="type"
                value={form.type}
                onChange={handleChange}
                options={[
                { label: "Theory", value: "theory" },
                { label: "Practical", value: "practical" },
                { label: "Both", value: "both" },
                ]}
            />

            {/* Max Marks */}
            <InputField
                label="Max Marks *"
                name="maxMarks"
                type="number"
                value={form.maxMarks}
                onChange={handleChange}
            />

            {/* Pass Marks */}
            <InputField
                label="Pass Marks"
                name="passMarks"
                type="number"
                value={form.passMarks}
                onChange={handleChange}
            />

            {/* Credits */}
            <InputField
                label="Credits"
                name="credits"
                type="number"
                value={form.credits}
                onChange={handleChange}
            />

            {/* Department */}
            <InputField
                label="Department"
                name="department"
                value={form.department}
                onChange={handleChange}
            />

            {/* Level */}
            {/* <Select
                label="Level"
                name="level"
                value={form.level}
                onChange={handleChange}
                options={[
                { label: "Primary", value: "primary" },
                { label: "Secondary", value: "secondary" },
                { label: "Higher Secondary", value: "higher-secondary" },
                { label: "Degree", value: "degree" },
                ]}
            /> */}

            {/* Academic Year */}
            <div>
            <label className="block text-sm font-medium mb-1">
            Academic Year
            </label>
            {year.years.length<=0 ?
            <input type="text" readOnly placeholder="No Academic Years: could be fetch_err()" />
            : (
            <select onChange={handleChange} value={form.academicYear} className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-700 outline-none" name="academicYear" id="year">
                <option value="">Academic Year</option>
                {year.years?.map((ele,index)=>{
                    return(
                        <option key={index} value={ele?._id}>{ele.code}</option>
                    )
                })}
            </select>)}
            </div>


            </div>

            {/* Description */}
            <div className="mt-6">
            <label className="block text-sm font-medium mb-1">
                Description
            </label>
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-700 outline-none"
            />
            <span id="description" className="text-red-500 text-sm errorDisplay"></span>
            </div>


            {/* ------------------- combined ------------------- */}
            <div className="flex justify-around max-h-64 overflow-y-scroll">
            {/* ---------- Choose Batches ---------- */}
                <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
                    Choose Batches
                </label>

                <div className="border rounded-md p-4 max-h-56 overflow-y-auto space-y-2 bg-gray-50">
                    {batches.batches.length<=0 ?
                    <input readOnly type="text" placeholder="No Batch Data: could be fetch_err()"/>
                    :
                    batches.batches?.map((batch) => (
                    <label
                        key={batch?.code}
                        className="flex items-center gap-3 text-sm cursor-pointer"
                    >
                        <input
                        type="checkbox"
                        checked={form.batchesToFollow.includes(batch.code)}
                        onChange={() => handleBatchToggle(batch.code)}
                        className="accent-green-700"
                        />
                        <span>
                        {batch?.name}
                        <span className="text-gray-500 ml-1">
                            ({batch?.code})
                        </span>
                        </span>
                        
                    </label>
                    ))}
                </div>

                {form.batchesToFollow.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                    No batches selected
                    </p>
                )}
                </div>


            {/* Reference Books */}
            <div className="mt-6">
            <label className="block text-gray-600 mb-2 font-medium">
            Upload Documents (PDF / Image)
            </label>
            
            <div>

                <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                multiple
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                />

                {/* Error Message */}
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
                <br /><br />
            </div>

            
                <div className="flex gap-2 mb-2">
                <ul className="space-y-2">
                    {form.referenceBooks.map((file, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center bg-white p-2 rounded border"
                    >
                        <span className="text-gray-700">{file.name}</span>

                        <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 text-sm font-medium hover:underline"
                        >
                        Remove
                        </button>
                    </li>
                    ))}
                </ul>
                </div>
            
            </div>
            </div>


            {/* Actions */}
            <div className="flex justify-end gap-4 mt-10">
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
                {year.loading? "Adding....": "Save Subject"}
            </button>
            </div>
        </form>
        </div>
    );
    };

    export default AddSubject;

    /* ---------- Reusable Inputs ---------- */
