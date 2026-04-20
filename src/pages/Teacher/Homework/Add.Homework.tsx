import { InputField, Select } from '@/components';
import FormActions from '@/components/FormAction';
import { Section } from '@/components/Teacher/Section';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks';
import React, { useEffect, useState } from 'react'
import { useAppNavigate } from '@/hooks/useNavigate.hook';
import { Textarea } from '@/components/textArea';
import { SubjectService } from '@/api/Services/subject.service';
import { BatchService } from '@/api/Services/batch.service';
import { toast } from 'react-toastify';
import { Roles } from '@/constants/role.enum';
import { storeBatches } from '@/utils/Redux/Reducer/batchReducer';
import { storeSchoolAcademicSubjects } from '@/utils/Redux/Reducer/subjectReducer';
import { handleValidationOF } from '@/validation/validateFormData';
import { HomeworkSchema } from '@/validation/teacher.validation';
import { HomeworkService } from '@/api/Services/Teacher/homework.service';
import { HomeWorkStatus } from '@/types/homework.status';
import { TeacherService } from '@/api/Services/teacher.service';
import { useParams } from 'react-router-dom';
import { IAttachment } from '@/components/HomeworkCard';

const AddHomework = () => {
    
    const {homeworkId}=useParams();//while Edit homework

    const [form, setForm] = useState({
        title: "",
        description: "",
        subjectId: "",
        batchId: "",
        status: HomeWorkStatus.pending,
        dueDate: new Date("1-02-2026"),
        attachments: [],
        });

        const [existingDocs,setExistingDocs]=useState<IAttachment[]|File[]>([]);
        const [loading,setLoading]=useState<boolean>(false);
        //Only used for edit

        const subjectStore=useAppSelector((state)=>state.schoolSubject)
        const batchStore=useAppSelector((state)=>state.batch)
        const {user}=useAppSelector((state)=>state.currentUser);
        const dispatch=useAppDispatch();

        useEffect(()=>{
            //sub & batch

            if(!user.id){
                toast.warn('teacherNotFound Kindly re-Login');
                return;
            }

            const fetchStoreData=async()=>{
                const resTeacher=await TeacherService.get(Roles.Teacher,user.id);
                const teacherProfile=resTeacher.data?.data;

                const res1=await SubjectService.getAll(Roles.Teacher);
                const res2=await BatchService.getAllWithQuery({center:teacherProfile.teacher.center});

                if(!res1.success){
                    toast.error(res1.error.message);
                    return res1.success;
                }

                if(!res2.success){
                    toast.error(res2.error.message);
                    return res2.success;
                }

                const batches=res2.data.data||[];
                dispatch(storeBatches(batches));

                const subjects=res1.data.data||[];
                dispatch(storeSchoolAcademicSubjects(subjects));
                return true;
            }

            fetchStoreData();

        },[dispatch]);

        //UseEffect for edit data
        useEffect(()=>{
            if(!homeworkId){
                return;
            }

            const fetchHomework=async()=>{
                const res = await HomeworkService.get(Roles.Teacher,homeworkId);

                if(!res.success){
                    toast.error(res.error.message);
                    return res.success;
                }

                const homework=res.data.data;
                
                const homeworkData={
                    title:homework.title,
                    description:homework.description,
                    subjectId:homework.subjectId as string,
                    batchId:homework.batchId,
                    status:homework.status,
                    dueDate:homework.dueDate?.split('T')[0],
                    attachments:homework.attachments
                }
                
                setExistingDocs(homework?.attachments);
                setForm(homeworkData);
            };
            fetchHomework();
        },[homeworkId]);

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
                attachments: [...prev?.attachments, ...files],
            }));
        };

        const removeAttachment = (index:number) => {
            setForm((prev) => ({
                ...prev,
                attachments: prev.attachments.filter((_, i) => i !== index),
            }));
        };

        const handleSubmit = async () => {

            handleValidationOF(HomeworkSchema,form);
            setLoading(true)
            
            const formData=new FormData();
            
            
            formData.append('existingDocs',JSON.stringify(existingDocs));

            console.log('@addHomework existingDocs',existingDocs);

            for(let key in form) {
                if(key=='attachments') {
                    form.attachments.forEach(file => {
                        formData.append("docs", file)
                    })
                }

                formData.append(key,form[key])
            }

            
            const res=await HomeworkService.create(formData);
            
            setLoading(true)

            if(!res.success){
                toast.error(res.error.message);
                return res.success;
            }

            goBack();
            toast.success(res.data.message);
            return res.success;
        };

        const handleEditSubmit = async () => {

            handleValidationOF(HomeworkSchema,form);
            setLoading(true)
            
            const formData=new FormData();

            for(let key in form) {
                if(key=='attachments') {
                    form.attachments.forEach(file => {
                            formData.append("docs", file)
                    })
                }

                formData.append(key,form[key]);
            }
            
            const res=await HomeworkService.update(Roles.Teacher,homeworkId,formData);

            setLoading(true)

            if(!res.success){
                toast.error(res.error.message);
                return res.success;
            }

            goBack();
            toast.success(res.data.message);
            return res.success;
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
                value={form?.subjectId}
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
                    {form.attachments?.map((file, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                    >
                        {file?.name ? 
                        <span className="text-sm">{file?.name}</span>
                        :
                        <a 
                            href={file?.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            >
                            <span className="text-sm">{file?.fileName}</span>
                            </a>
                        }

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
        {homeworkId
        ? 
        <FormActions
        submitLabel="Edit Homework"
        submitType="button"
        onCancel={goBack}
        onSubmit={handleEditSubmit}
        loading={loading}
        />
        :
        <FormActions
        submitLabel="Add Homework"
        submitType="button"
        onCancel={goBack}
        onSubmit={handleSubmit}
        loading={loading}
        />
        }
    </div>
    );
}

export default AddHomework