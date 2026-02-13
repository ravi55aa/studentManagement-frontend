import React, { useEffect, useState } from "react";
import InputField from "@/components/inputField";
import { toast } from "react-toastify";

import { ITeacher,ITeacherBio } from "@/interfaces/ITeacher";
import { handleApi, HandleApiOptions } from "@/api/global.api";

import { useAppNavigate } from "@/hooks/navigate.hook";
import { handleValidationOF } from "@/validation/validateFormData";

import { teacherAssignmentSchema, teacherBioFormSchema } from "@/validation/teacher.validation";

import { basicTeacherFields } from "@/constants/teacher.Fields";
import { useParams } from "react-router-dom";
import { ActionBar,Grid } from "@/components/Teacher/ActionBar";
import { Section } from "@/components/Teacher/Section";
import { CheckBox, CheckList } from "@/components/Teacher";
import { employmentStatusOptions, teacherDesignationOptions } from "@/constants/teacher";
import { Select } from "@/components/Select";
import { useAppSelector } from "@/hooks/storeHooks";
import { department_obj } from "@/constants/deparment";
import { Teachers } from "@/types/types";
/* ------------------------------------------------ */


const EditTeacherPage = () => {
    const { id } = useParams();
    const { goBack } = useAppNavigate();

    const [loading, setLoading] = useState(true);
    const [teachers, setTeachers] = useState<Teachers>({teacher:null,teacherBio:null});

    useEffect(() => {
        if (!id) return;

        const fetchTeacher = async () => {
        setLoading(true);

        const config: HandleApiOptions<null> = {
            endPoint: `/teacher/${id}`,
            method: "get",
            headers: { role: "School" },
        };

        const res = await handleApi<null, Teachers>(config);

        if (!res.success) {
            toast.error("Failed to fetch teacher");
            return;
        }

        setTeachers(res.data?.data);
        setLoading(false);
        };

        fetchTeacher();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!teachers.teacherBio) return null;

    return (
        <div className="p-6 bg-white min-h-screen max-w-6xl space-y-8">
        <EditTeacherBio teacher={teachers.teacherBio} />
        <EditTeacherProfessional teacher={teachers.teacher} goBack={goBack} />
        </div>
    );
};
export default EditTeacherPage;



//**TEACHER-BIO-DATA */
const EditTeacherBio = ({ teacher }: { teacher: Partial<ITeacherBio> }) => {
    const [form, setForm] = useState<Partial<ITeacherBio>>({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        phone: teacher.phone,
        qualification: teacher.qualification,
        dateOfBirth: teacher.dateOfBirth?.split("T")[0],
        experience: teacher.experience,
        gender: teacher.gender,
        profilePhoto: null,
        documents: teacher.documents || [],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleUpdateBio = async () => {
        const isValid = handleValidationOF(teacherBioFormSchema, form);
        if (!isValid.success) return;

        const formData = new FormData();

        formData.append("firstName", form.firstName || "");
        formData.append("lastName", form.lastName || "");
        formData.append("email", form.email || "");
        formData.append("phone", form.phone || "");
        formData.append("qualification", form.qualification || "");
        formData.append("gender", form.gender || "");
        formData.append("experience", String(form.experience || 0));

        if (form.dateOfBirth) {
        formData.append(
            "dateOfBirth",
            new Date(form.dateOfBirth).toISOString()
        );
        }

        if (form.profilePhoto instanceof File) {
        formData.append("profile", form.profilePhoto);
        }

        form.documents?.forEach((doc) => {
        if (doc ) {
            formData.append("docs", doc);
        } else {
            formData.append("existingDocs", doc);
        }
        });

        const config: HandleApiOptions<FormData> = {
            endPoint: `/teacher/bio/update/${teacher._id}`,
            method: "patch",
            payload: formData,
            headers: { role: "School" },
        };

        const res = await handleApi(config);

        if (!res.success) {
        toast.error("Failed to update bio");
        return;
        }

        toast.success("Bio Updated Successfully");
    };

    return (
        <Section title="Basic Teacher Information">
        <Grid>
            {basicTeacherFields.map((field, ind) => (
            <InputField
                key={ind}
                label={field.label}
                type={field.type}
                name={field.name}
                value={form[field.name as keyof typeof form] || ""}
                onChange={handleChange}
            />
            ))}
        </Grid>

        <ActionBar>
            <button
            onClick={handleUpdateBio}
            className="bg-green-700 text-white px-6 py-2 rounded-md"
            >
            Update Bio
            </button>
        </ActionBar>
        </Section>
    );
};



//**TEACHER-PROFESSIONAL-DATA */
const EditTeacherProfessional = ({
    teacher,
    goBack,
    }: {
    teacher: Partial<ITeacher>
    goBack: () => void;
    }) => {

    const [professionalForm, setForm] = useState<Partial<ITeacher>>({
        employmentStatus: teacher.employmentStatus,
        designation: teacher.designation,
        academicYearId: teacher.academicYearId,
        assignedSubjects: teacher.assignedSubjects || [],
        department: teacher.department || [],
        dateOfJoining: teacher.dateOfJoining?.split("T")[0],
        dateOfLeaving: teacher.dateOfLeaving?.split("T")[0],
        centerId: teacher.centerId?._id,
    });

    const subjectStore=useAppSelector((state)=>state.schoolSubject);
    const centersReduxStore=useAppSelector((state)=>state.center);
    const yearStore=useAppSelector((state)=>state.schoolYear);


    const handleBasicChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const spanTag=document.getElementById(name);

        if(spanTag){
            spanTag.textContent="";
        }

        setForm((p) => ({ ...p, [name]: value }));
    };


    const handleDepartmentToggle = (e:React.ChangeEvent<HTMLInputElement> ) => {
        const {name}=e.target;

        const dept=department_obj[name]

        setForm((prev) => {
            const exists = prev.department.includes(dept);

            return {
            ...prev,
            department: exists
                ? prev.department.filter((id) => id !== dept)
                : [...prev.department, dept],
            };
        });
    };


    const handleUpdateProfessional = async () => {
        const isValid = handleValidationOF(
        teacherAssignmentSchema,
        professionalForm
        );

        if (!isValid.success) return;

        const config: HandleApiOptions<Partial<ITeacher>> = {
        endPoint: `/teacher/update/${teacher.teacherId}`,
        method: "patch",
        payload: professionalForm,
        headers: { role: "School" },
        };

        const res = await handleApi(config);

        if (!res.success) {
        toast.error("Failed to update professional details");
        return;
        }

        toast.success("Teacher Updated Successfully");
        goBack();
    };


    return (
        <Section title="Professional Details">
        {/* All your selects + CheckList components here */}

        <Section title="Professional Details">
            <Grid>
            <Select
                label="Employment Status"
                name="employmentStatus"
                value={professionalForm.employmentStatus}
                options={employmentStatusOptions}
                onChange={handleBasicChange}
            />

            <Select
                label="Designation"
                value={professionalForm.designation}
                options={teacherDesignationOptions}
                name="designation"
                onChange={handleBasicChange}
            />

            <InputField type="date" value={professionalForm.dateOfJoining} name="dateOfJoining" onChange={handleBasicChange} label="Date of Joining" />

            <InputField type="date" value={professionalForm.dateOfLeaving}  name="dateOfLeaving" onChange={handleBasicChange} label="Date of Leaving" />
            </Grid>

            {/* Center */}
            <div>
                <label className="block text-sm font-medium mb-1">
                Center *
                </label>
                <select
                name="centerId"
                value={professionalForm.centerId}
                onChange={handleBasicChange}
                className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-700 outline-none"
                >
                <option value="">Select center</option>
                {centersReduxStore.centers?.map((batch)=>{
                    return   (
                    <option value={batch?._id}>{batch?.name}</option>
                    )

                })}
                </select>
                <span id="centerId" className="text-red-500 errorDisplay"></span>
            </div>



            {/* ACADEMIC YEAR  */}
            <CheckList
            label="Select Academic Year"
            items={yearStore.years}
            type="radio"
            name="academicYear"
            selected={professionalForm.academicYearId}
            displayKey="year"
            onChange={(code) =>
            setForm((prev) => ({
                ...prev,
                academicYearId: code,
            }))
            }
        />


            {/* Subjects */}
            <CheckList
            label="Assigned Subjects"
            items={subjectStore.subjects}
            type="checkbox"
            selected={professionalForm.assignedSubjects}
            displayKey="name"
            onChange={(code) =>
                setForm((prev) => {
                const exists = prev.assignedSubjects.includes(code);

                return {
                    ...prev,
                    assignedSubjects: exists
                    ? prev.assignedSubjects.filter((id) => id !== code)
                    : [...prev.assignedSubjects, code],
                };
                })
            }
            />
        
        
                {/* Department */}
                <CheckBox
                    label="Department"
                    items={department_obj}
                    name="department"
                    onChange={handleDepartmentToggle}
                    form={professionalForm.department}
                />

            </Section>

        <ActionBar>
            <button
            onClick={handleUpdateProfessional}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800">
                Update Professional Details
            </button>
        </ActionBar>
        </Section>
    );
};



