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

/* ------------------------------------------------ */


const EditTeacherPage = () => {
    const { id } = useParams();
    const { goBack } = useAppNavigate();

    const [loading, setLoading] = useState(true);
    const [teacher, setTeacher] = useState<Partial<ITeacherBio>>(null);

    useEffect(() => {
        if (!id) return;

        const fetchTeacher = async () => {
        setLoading(true);

        const config: HandleApiOptions<null> = {
            endPoint: `/teacher/${id}`,
            method: "get",
            headers: { role: "School" },
        };

        const res = await handleApi<null, Partial<ITeacherBio>>(config);

        if (!res.success) {
            toast.error("Failed to fetch teacher");
            return;
        }

        setTeacher(res.data.data);
        setLoading(false);
        };

        fetchTeacher();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!teacher) return null;

    return (
        <div className="p-6 bg-white min-h-screen max-w-6xl space-y-8">
        <EditTeacherBio teacher={teacher} />
        <EditTeacherProfessional teacher={teacher} goBack={goBack} />
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
        if (doc instanceof File) {
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
    const [form, setForm] = useState<Partial<ITeacher>>({
        employmentStatus: teacher.employmentStatus,
        designation: teacher.designation,
        classTeacherOf: teacher.classTeacherOf,
        academicYearId: teacher.academicYearId,
        assignedSubjects: teacher.assignedSubjects || [],
        department: teacher.department || [],
        dateOfJoining: teacher.dateOfJoining?.split("T")[0],
        dateOfLeaving: teacher.dateOfLeaving?.split("T")[0],
        centerId: teacher.centerId?._id,
        });

    const handleUpdateProfessional = async () => {
        const isValid = handleValidationOF(
        teacherAssignmentSchema,
        form
        );

        if (!isValid.success) return;

        const config: HandleApiOptions<Partial<ITeacher>> = {
        endPoint: `/teacher/update/${teacher._id}`,
        method: "patch",
        payload: form,
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
        <ActionBar>
            <button
            onClick={handleUpdateProfessional}
            className="bg-green-700 text-white px-6 py-2 rounded-md"
            >
            Update Professional Details
            </button>
        </ActionBar>
        </Section>
    );
};

