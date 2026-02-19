import { useState } from "react";
import { SquareChevronRight } from "lucide-react";
import { generateFeeCode } from "@/hooks/useGeneratecode";
import { useAppNavigate } from "@/hooks/useNavigate.hook";

import {InputField,Select} from "@/components"; 
import { Section } from "@/components/Teacher/Section"; 
import { ActionBar } from "@/components/Teacher/ActionBar";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { handleValidationOF } from "@/validation/validateFormData";

import { handleApi, HandleApiOptions } from "@/api/global.api";
import { toast } from "react-toastify";
import { feeSchema } from "@/validation/school.validator";




export default function AddFeePage() {

    const { goBack } = useAppNavigate();
    const courses=useAppSelector((state)=>state.courses.courses);
    const center=useAppSelector((state)=>state.center.centers);
    const subjects=useAppSelector((state)=>state.schoolSubject.subjects);
    const annuals=useAppSelector((state)=>state.schoolYear.years);

    const [appliesToObj,setApplies2Obj]=useState({
        "Course":courses, 
        "Exam"  :subjects,
        "Center":center,
        "Annual":annuals
    });
    

    const [form, setForm] = useState({
        name: "",
        code: "",
        type: "",
        appliesTo: {
            model: "",
            id: "",
            },
        status: "ACTIVE",
        totalAmount: 0,
        dueDate: new Date(12/12/2024),
        currency: "INR",
        autoReminder: {
        enabled: false,
        daysBeforeDue: 0,
        },
    });

    /* ----------------------------------------
        HANDLE CHANGE
    ---------------------------------------- */

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleTypeChange = (value: string) => {

        let model = "";

        switch (value) {
        case "COURSE":
            model = "Course";
            break;
        case "ANNUAL":
            model = "School";
            break;
        case "EXAM":
            model = "Exam";
            break;
        case "CENTER":
            model = "Center";
            break;
        default:
            model = "";
        }

        setForm((prev) => ({
        ...prev,
        type: value,
        appliesTo: {
            ...prev.appliesTo,
            model,
        },
        }));
    };

    const handleAppliesToChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setForm((prev) => ({
        ...prev,
        appliesTo: {
            ...prev.appliesTo,
            id: e.target.value,
        },
        }));
    };

    const handleReminderChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
        ...prev,
        autoReminder: {
            ...prev.autoReminder,
            [name]: type === "checkbox" ? checked : value,
        },
        }));
    };

    const handleSubmit = async () => {
        console.log("Fee Data:", form);
        
        setForm((prev)=>({...prev,
            totalAmount:Number(prev.totalAmount),
            autoReminder:{enabled:prev.autoReminder.enabled,daysBeforeDue:Number(prev.autoReminder.daysBeforeDue)},
        })); 

        const isValid=handleValidationOF(feeSchema,form);
        
        if(isValid.success){
            console.log("Validation_Error");
            return false;
        }

        const config:HandleApiOptions<object>={
            endPoint:"fee/add",
            payload:form,
            headers:{role:"School"},
            method:"post"
        };

        const res=await handleApi(config);
        
        if(!res.success){
            setApplies2Obj((prev)=>({...prev,School:courses}));
            return res.success;
        }

        toast.success("New fee Added successfully");
        goBack();
        return true;
    };

    /* ----------------------------------------
        UI
    ---------------------------------------- */

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">

        <Section title="Basic Fee Information">

            <div className="grid md:grid-cols-2 gap-6">

            <InputField
                label="Fee Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter fee name"
            />

            {/* Generate Code */}
            <div>
                <label className="block text-sm mb-1">Fee Code</label>
                <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="underline text-green-600"
                    onClick={() =>
                    setForm((prev) => ({
                        ...prev,
                        code: generateFeeCode(form.name),
                    }))
                    }
                >
                    Generate
                </button>
                <SquareChevronRight size={16} />
                {form.code && (
                    <span className="bg-gray-200 px-2 py-1 rounded">
                    {form.code}
                    </span>
                )}
                </div>
            </div>

            <Select
                label="Fee Type"
                name="type"
                value={form.type}
                onChange={(e) => handleTypeChange(e.target.value)}
                options={[
                { label: "Course Fee", value: "COURSE" },
                { label: "Annual Fee", value: "ANNUAL" },
                { label: "Exam Fee", value: "EXAM" },
                { label: "Center Fee", value: "CENTER" },
                { label: "Other", value: "OTHER" },
                ]}
            />

            {/* Applies To */}
            {form.type && (
                <Select
                label={`Select ${form.appliesTo.model}`}
                name="appliesToId"
                value={form.appliesTo.id}
                onChange={handleAppliesToChange}
                options={[
                    { label: `Select ${form.appliesTo.model}`, value: "" },
                    // Replace below with real redux data
                ...(appliesToObj[form.appliesTo.model]?.map((value) =>  ({
                    label: value.name,
                    value: value._id,
                    })) || [])
                ]}
                />
            )}

            <InputField
                type="number"
                label="Total Amount"
                name="totalAmount"
                value={form.totalAmount}
                onChange={handleChange}
            />

            <Select
                label="Currency"
                name="currency"
                value={form.currency}
                onChange={handleChange}
                options={[
                { label: "INR", value: "INR" },
                { label: "USD", value: "USD" },
                ]}
            />

            <InputField
                type="date"
                label="Due Date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
            />

            <Select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                options={[
                { label: "Active", value: "ACTIVE" },
                { label: "Inactive", value: "INACTIVE" },
                ]}
            />

            </div>
        </Section>

        {/* Auto Reminder */}
        <Section title="Auto Reminder Settings">

            <div className="flex items-center gap-3 mb-4">
            <input
                type="checkbox"
                name="enabled"
                checked={form.autoReminder.enabled}
                onChange={handleReminderChange}
            />
            <label>Enable Auto Reminder</label>
            </div>

            {form.autoReminder.enabled && (
            <InputField
                type="number"
                label="Days Before Due"
                name="daysBeforeDue"
                value={form.autoReminder.daysBeforeDue}
                onChange={handleReminderChange}
            />
            )}
        </Section>

        <ActionBar>
            <button
            type="button"
            onClick={goBack}
            className="px-6 py-2 border rounded-md"
            >
            Cancel
            </button>

            <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-700 text-white rounded-md"
            >
            Add Fee
            </button>
        </ActionBar>

        </div>
    );
}
