import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleApiOptions, handleApi } from "@/api/global.api";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks/storeHooks";
import { handleValidationOF } from "@/validation/validateFormData";
import { courseValSchema,courseFormSchema } from "@/validation/school.validator";
import InputField from "@/components/inputField";

/* ===================== TYPES ===================== */

export type CourseStatus = "active" | "inactive";
export type DurationUnit = "hours" | "months" | "years";

export interface ICourseForm {
    name: string;
    code: string;
    academicYear: string;
    //level: string;
    description: string;
    status: CourseStatus;

    duration: {
        value: number;
        unit: DurationUnit;
    };

    schedule: {
        startDate: string;
        endDate: string;
    };

    maxStudents: number;
    enrollmentOpen: boolean;

    subjects: string[];
    batches: string[];
    coordinators: string[];

    eligibilityCriteria: string;
    syllabusUrl: string;
    attachments: File[];
    }

    /* ===================== INITIAL STATE ===================== */

    const initialForm: ICourseForm = {
    name: "",
    code: "",
    academicYear: "",
    //level: "",
    description: "",
    status: "active",

    duration: {
        value: 0,
        unit: "hours",
    },

    schedule: {
        startDate: "",
        endDate: "",
    },

    maxStudents: 0,
    enrollmentOpen: true,

    subjects: [],
    batches: [],
    coordinators: [],

    eligibilityCriteria: "",
    syllabusUrl: "",
    attachments: [],
};

/* ===================== COMPONENT ===================== */

const CourseAddPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<ICourseForm>(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /****************** Redux-store ******************/
    const batchesReduxStore=useAppSelector((state)=>state.batch);
    const subjectReduxStore=useAppSelector((state)=>state.schoolSubject);
    const academicYearReduxStore=useAppSelector((state)=>state.schoolYear);

    /* ===================== HANDLERS ===================== */

    // generic change (supports nested fields)
    const handleChange = (
        e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type } = e.target;

        const spanTag=document.getElementById(name.split(".").join(" "))

        if(spanTag){
            spanTag.textContent="";
        }

        if (name.includes(".")) {
        const [parent, child] = name.split(".");
        setForm((prev) => ({
            ...prev,
            [parent]: {
            ...(prev)[parent],
            [child]: value,
            },
        }));
        return;
        }

        if (type === "checkbox") {
        setForm((prev) => ({
            ...prev,
            [name]: (e.target as HTMLInputElement).checked,
        }));
        return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // file handling
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        setForm((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...Array.from(e.target.files!)],
        }));
    };


    const removeFile = (index: number) => {
        setForm((prev) => ({
        ...prev,
        attachments: prev.attachments.filter((_, i) => i !== index),
        }));
    };

    /* ===================== SUBMIT ===================== */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        const isValidated = 
            handleValidationOF<courseFormSchema>
            (courseValSchema,form);
        
        if(!isValidated.success){
            console.log(isValidated.error);
            return isValidated.success;
        }
        
        try {
        setLoading(true);

        const formData = new FormData();

        // core
        formData.append("name", form.name);
        formData.append("code", form.code);
        formData.append("academicYear", form.academicYear);
        //formData.append("level", form.level);
        formData.append("description", form.description);
        formData.append("status", form.status);

        // duration & schedule
        formData.append("duration[value]", String(form.duration.value));
        formData.append("duration[unit]", form.duration.unit);
        formData.append("schedule[startDate]", form.schedule.startDate);
        formData.append("schedule[endDate]", form.schedule.endDate);

        // capacity
        formData.append("maxStudents", String(form.maxStudents));
        formData.append("enrollmentOpen", String(form.enrollmentOpen));

        // relations
        form.subjects.forEach((id) => formData.append("subjects[]", id));
        form.batches.forEach((id) => formData.append("batches[]", id));
        form.coordinators.forEach((id) =>
            formData.append("coordinators[]", id)
        );

        // meta
        formData.append("eligibilityCriteria", form.eligibilityCriteria);
        formData.append("syllabusUrl", form.syllabusUrl);
        form.attachments.forEach((file) =>
            formData.append("docs", file)
        );

        const config: HandleApiOptions<FormData> = {
            method: "post",
            endPoint: "/school/academic/courses/add",
            payload: formData,
            headers: { role: "school" },
        };

        const res = await handleApi(config);
        if (!res.success) throw new Error(res.error.message);

        toast.success("Course created successfully");
        navigate(-1);
        } catch (err) {
            setError(err?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    const handleBatchToggle = (value: string,key:string) => {
        if(key=="subjects" && form.subjects.includes("other")){
            const i=form.subjects.indexOf("other");
            form.subjects.splice(i,1);
        }

        setForm((prev) => {
            const exists = prev[key].includes(value);

            return {
            ...prev,
            [key]: exists
                ? prev[key].filter((storedValue:string) => storedValue !== value)
                : [...prev[key], value],
            };
        });
    };

    const handleSelfDevSubjectOfCourse=(e: React.ChangeEvent<HTMLInputElement>)=>{
        form.subjects[1]=e.target.value;
    };

    /* ===================== UI ===================== */

    return (
        <div className="p-6 bg-white min-h-screen max-w-6xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Add Course
        </h1>
        <p className="text-sm text-gray-500 mb-6">
            Create a new academic course
        </p>

        {error && 
            <p className="text-red-600 mb-4">{error}</p>
        }

        <form
            onSubmit={handleSubmit}
            className="border rounded-md p-6 space-y-6"
        >
            {/* BASIC */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <Input label="Course Name *" name="name" value={form.name} onChange={handleChange} /> */}
            <InputField
                label="Course Name *"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
            />
            
            <InputField
                label="Code *"
                name="code"
                type="text"
                value={form.code}
                onChange={handleChange}
            />
            
            {/* <InputField
                label="Level"
                name="level"
                type="text"
                value={form.level}
                onChange={handleChange}
            /> */}

            
            </div>

            {/* DURATION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
                label="Duration Value *"
                name="duration.value"
                type="number"
                value={form.duration.value}
                onChange={handleChange}
            />
            
            <Select
                label="Duration Unit *"
                name="duration.unit"
                value={form.duration.unit}
                onChange={handleChange}
                options={[
                { label: "Hours", value: "hours" },
                { label: "Months", value: "months" },
                { label: "Years", value: "years" },
                ]}
            />
            </div>

            {/* SCHEDULE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                label="Start Date"
                name="schedule.startDate"
                type="date"
                value={form.schedule.startDate}
                onChange={handleChange}
                />
                
                <InputField
                label="End Date"
                name="schedule.endDate"
                type="date"
                value={form.schedule.endDate}
                onChange={handleChange}
                />
            </div>

            {/* MAX-STUDENTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
                label="Max students"
                name="maxStudents"
                type="number"
                value={form.maxStudents}
                onChange={handleChange}
                />
            </div>


            {/* SUB+BATCHES+COORDINATORS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Batches */}
            <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
                    Choose Batches
                </label>

                <div className="border rounded-md p-4 max-h-56 overflow-y-auto space-y-2 bg-gray-50">
                    {batchesReduxStore.batches.length<=0 ?
                    <input readOnly type="text" placeholder="No Batch Data: could be fetch_err()"/>
                    :
                    batchesReduxStore.batches?.map((batch) => (
                    <label
                        key={batch?.code}
                        className="flex items-center gap-3 text-sm cursor-pointer"
                    >
                        <input
                        type="checkbox"
                        checked={form.batches.includes(batch.code)}
                        onChange={() => handleBatchToggle(batch.code,"batches")}
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

                {form.batches.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                    No batches selected
                    </p>
                )}
                </div>

                {/* Subjects */}
                <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">
                        Choose Subjects
                    </label>

                    <div className="border rounded-md p-4 max-h-56 overflow-y-auto space-y-2 bg-gray-50">
                        {subjectReduxStore.subjects.length<=0 ?
                        <input readOnly type="text" placeholder="No Batch Data: could be fetch_err()"/>
                        :
                        subjectReduxStore.subjects?.map((subject) => (
                        <label
                            key={subject?.code}
                            className="flex items-center gap-3 text-sm cursor-pointer"
                        >
                            <input
                            type="checkbox"
                            checked={form.subjects.includes(subject.code)}
                            onChange={() => handleBatchToggle(subject.code,"subjects")}
                            className="accent-green-700"
                            />
                            <span>
                            {subject?.name}
                            <span className="text-gray-500 ml-1">
                                ({subject?.code})
                            </span>
                            </span>
                            
                        </label>
                        ))}
                        
                        <label htmlFor="other" className="flex items-center gap-3 text-sm cursor-pointer">
                        <input
                        type="checkbox"
                        id="other"
                        checked={form.subjects[0]=="other"}
                        onChange={()=>setForm((prev)=>({...prev,subjects:["other"]}))}
                        className="accent-green-700"
                        />
                        Other
                        </label>
                        
                        { form.subjects[0] == "other"
                        &&
                        
                        <Input label="Enter the Subject" name="otherCourse" type="text" value={form.subjects[1]} onChange={handleSelfDevSubjectOfCourse} />
                        } 
                    </div>

                    {form.batches.length === 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                        No Subjects selected
                        </p>
                    )}
                    </div>

                {/* Academic Year */}
                <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">
                        Choose AcademicYear
                    </label>

                    <div className="border rounded-md p-4 max-h-56 overflow-y-auto space-y-2 bg-gray-50">
                        {
                        academicYearReduxStore.years?.map((year) => (
                        <label
                            key={year?.code}
                            className="flex items-center gap-3 text-sm cursor-pointer"
                        >
                            <input
                            type="radio"
                            name="academicYear"
                            value={year.code}
                            onChange={(e) => handleChange(e)}
                            className="accent-green-700"
                            />
                            <span>
                            {year?.code}
                            <span className="text-gray-500 ml-1">
                                ({year?.startDate.split("T")[0]})
                            </span>
                            </span>
                            
                        </label>
                        ))}
                    </div>

                    {form.batches.length === 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                        No batches selected
                        </p>
                    )}
                    </div>
            </div>



            {/* DESCRIPTION */}
            <Textarea label="Description" name="description" value={form.description} onChange={handleChange} />

            {/* FILES */}
            <div>
            <label className="block text-sm font-medium mb-1">
                Attachments
            </label>
            <input type="file" multiple onChange={handleFileChange} />
            <ul className="mt-2 space-y-1">
                {form.attachments.map((file, i) => (
                <li key={i} className="flex justify-between text-sm">
                    {file.name}
                    <button type="button" onClick={() => removeFile(i)} className="text-red-500">
                    Remove
                    </button>
                </li>
                ))}
            </ul>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4">
            <button type="button" onClick={() => navigate(-1)} className="border px-4 py-2 rounded">
                Cancel
            </button>
            <button type="submit" disabled={loading} className="bg-green-700 text-white px-6 py-2 rounded">
                {loading ? "Saving..." : "Save Course"}
            </button>
            </div>
        </form>
        </div>
    );
};

export default CourseAddPage;

/* ===================== INPUTS ===================== */

const Input = (props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{props.label}</label>
        <input {...props} className="w-full border rounded px-3 py-2 text-sm" />
        
    </div>
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{props.label}</label>
        <textarea {...props} rows={3} className="w-full border rounded px-3 py-2 text-sm" />
        <span id={props.name} className="text-sm text-red-500 errorDisplay"></span>
    </div>
);

const Select = (
    props: React.SelectHTMLAttributes<HTMLSelectElement> & {
        label: string;
        options: { label: string; value: string }[];
    }
    ) => (
    <div>
        <label className="block text-sm font-medium mb-1">{props.label}</label>
        <select {...props} className="w-full border rounded px-3 py-2 text-sm">
        <option value="">Select</option>
        {props.options.map((o) => (
            <option key={o.value} value={o.value}>
            {o.label}
            </option>
        ))}
        </select>
    </div>
);
