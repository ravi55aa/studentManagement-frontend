import { InputField, Select } from '@/components';
import FormActions from '@/components/FormAction';
import { Section } from '@/components/Teacher/Section';
import { useAppSelector } from '@/hooks/useStoreHooks';
import React, { useState } from 'react'
import { useAppNavigate } from '@/hooks/useNavigate.hook';
import { Textarea } from '@/components/textArea';

const AddHomework = () => {

    const [form, setForm] = useState({
        title: "",
        description: "",
        subjectId: "",
        batchId: "",
        status: "pending",
        dueDate: "",
        attachments: [],
        });

        const subjectStore=useAppSelector((state)=>state.schoolSubject)
        const batchStore=useAppSelector((state)=>state.batch)

        const {goBack}=useAppNavigate();

        const handleChange = (e:React.ChangeEvent<HTMLInputElement 
            | HTMLTextAreaElement| HTMLSelectElement>) => 
        {
            const { name, value } = e.target;

            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        const handleFileUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files);

        setForm((prev) => ({
            ...prev,
            attachments: [...prev.attachments, ...files],
        }));
        };

        const removeAttachment = (index:number) => {
        setForm((prev) => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index),
        }));
        };

        const handleSubmit = async () => {
            // dispatch(toggleAcademicLoading(true));
        
            // //validate
            // const payload = {
            //     ...form,
            //     maxMarks: Number(form.maxMarks),
            //     passMarks: Number(form.passMarks),
            //     credits: Number(form.credits),
            // };
        
            // if (Number(form.className) > 10 || Number(form.className) < 1) {
            //     const span = document.getElementById('className');
            //     if (span) {
            //         span.textContent = 'Enter a valid class(1-10)';
            //     }
            //     return false;
            // }
        
            // const validation = handleValidationOF(schoolSubjectSchema, payload);
        
            // if (!validation.success) {
            //   console.log('The validation. Error', validation.error);
            //   dispatch(toggleAcademicLoading(false));
            //   return false;
            // }
        
            // setError(null);
        
            // //formData.append()
            // const formData = new FormData();
        
            // for (const field in form) {
            //   if (field == 'referenceBooks') {
            //     form[field]?.forEach((ele) => formData.append('docs', ele));
            //   } else {
            //     formData.append(field, form[field]);
            //   }
            // }
            // const response = await SubjectService.create(formData);
        
            // if (!response.success) return response.success;
        
            // dispatch(toggleAcademicLoading(false));
            // toast.success('New Subject Added', { draggable: true });
            // goBack();
        
            goBack();
        };


    return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
        {/* Homework Basic Info */}
        <Section title="Homework Information">
            <div className="grid md:grid-cols-2 gap-6">

                <InputField
                label="Homework Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter homework title"
                />

                <Select
                label="Subject"
                name="subjectId"
                value={form.subjectId}
                onChange={handleChange}
                options={[
                    { label: "Select Subject", value: "" },
                    ...(subjectStore.subjects?.map((subject) => ({
                    label: subject.name,
                    value: subject._id,
                    })) || []),
                ]}
                />

                <Select
                label="Batch"
                name="batchId"
                value={form.batchId}
                onChange={handleChange}
                options={[
                    { label: "Select Batch", value: "" },
                    ...(batchStore.batches?.map((batch) => ({
                    label: batch.name,
                    value: batch._id,
                    })) || []),
                ]}
                />

                <Select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                options={[
                    { label: "Pending", value: "pending" },
                    { label: "Submitted", value: "submitted" },
                    { label: "Reviewed", value: "reviewed" },
                ]}
                />

                <InputField
                type="date"
                label="Due Date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                />

            </div>

            {/* Description */}
            <Textarea 
            onChange={handleChange} 
            placeholder="Enter homework description" 
            rows={4} 
            label='Description' 
            name='description' 
            value={form.description}
            />

            {/* Attachments */}
            <Section title="Attachments">
            <div className="space-y-4">

                <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="border rounded-md p-2 w-full"
                />

                {form.attachments?.length > 0 && (
                <div className="space-y-2">
                    {form.attachments.map((file, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                    >
                        <span className="text-sm">{file.name}</span>

                        <button
                        type="button"
                        className="text-red-500 text-sm"
                        onClick={() => removeAttachment(index)}
                        >
                        Remove
                        </button>
                    </div>
                    ))}
                </div>
                )}

            </div>
            </Section>

        </Section>

        {/* Form Actions */}
        <FormActions
        submitLabel="Add Homework"
        submitType="button"
        onCancel={goBack}
        onSubmit={handleSubmit}
        />
    </div>
    );
}

export default AddHomework