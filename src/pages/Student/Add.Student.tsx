import React, { useState } from "react";
import { toast } from "react-toastify";

import { InputField } from "@/components";
import { Section } from "@/components/Teacher/Section";
import { Grid } from "@/components/Teacher/ActionBar";
import { ActionBar, FileUpload } from "@/components/Teacher/ActionBar";
import { RadioGroup } from "@/components/Teacher";

import { useAppNavigate } from "@/hooks/useNavigate.hook";
import { handleValidationOF } from "@/validation/validateFormData";

import { createStudentSchema } from "@/validation/student.validation";
import { StudentService } from "@/api/Services/Student/student.service"; 
import { IStudent } from "@/interfaces/IStudent";

import { Gender_types} from "@/types/enums";
import { Student_Status } from "@/types/student.types";
import { useParams } from "react-router-dom";

const AddStudentPage = () => {

    const { goBack } = useAppNavigate();
    const {batchId}=useParams();

    const [studentForm, setStudentForm] = useState<IStudent>({
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: Gender_types.Male,
        dateOfBirth: null,
        parentName: "",
        parentPhone: "",
        status: Student_Status.Active,
        profile: null as File | string | null,
        batch:batchId
    });

    /* ---------- handlers ---------- */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const spanTag = document.getElementById(name);
        if (spanTag) spanTag.textContent = "";

        setStudentForm((prev) => ({...prev,[name]: value,}));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        setStudentForm((prev) => ({
        ...prev,
        profile: e.target.files![0],
        }));
    };

    /* ---------- Create Student ---------- */

    const handleCreateStudent = async () => {
        if(!batchId){
            toast.warn('Batch is invalid, kindly verify');
            return false;
        }
        
        const isValid = handleValidationOF(createStudentSchema, studentForm);

        if (!isValid.success) return false;

        const formData = new FormData();

        formData.append("name", studentForm.name!);
        formData.append("password", studentForm.password!);

        if (studentForm.email) formData.append("email", studentForm.email);
        if (studentForm.phone) formData.append("phone", studentForm.phone);

        if (studentForm.gender) formData.append("gender", studentForm.gender);

        if (studentForm.dateOfBirth) {
        formData.append(
            "dateOfBirth",
            new Date(studentForm.dateOfBirth).toISOString()
        );
        }

        if (studentForm.parentName)
        formData.append("parentName", studentForm.parentName);

        if (studentForm.parentPhone)
        formData.append("parentPhone", studentForm.parentPhone);

        if (studentForm.profile) {
        formData.append("profile", studentForm.profile);
        }

        const res = await StudentService.add(formData,batchId);

        if (!res.success) {
        toast.error(res.error?.message);
        return false;
        }

        toast.success("Student created successfully");
        goBack();

        return true;
    };

    return (
        <div className="p-6 bg-white min-h-screen max-w-5xl space-y-8">

        <Section title="Student Information">

            <Grid>

            <InputField
                label="Student Name"
                name="name"
                onChange={handleChange}
            />

            <InputField
                label="Email"
                name="email"
                onChange={handleChange}
            />

            <InputField
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
            />

            <InputField
                label="Phone"
                name="phone"
                onChange={handleChange}
            />

            <InputField
                label="Date Of Birth"
                type="date"
                name="dateOfBirth"
                onChange={handleChange}
            />

            <InputField
                label="Parent Name"
                name="parentName"
                onChange={handleChange}
            />

            <InputField
                label="Parent Phone"
                name="parentPhone"
                onChange={handleChange}
            />

            </Grid>

            {/* Gender */}
            <RadioGroup
            label="Gender"
            name="gender"
            options={["male", "female", "other"]}
            onChange={handleChange}
            />

            <hr />

            {/* Profile Upload */}
            <FileUpload
            label="Profile Photo"
            onChange={handleFileChange}
            />

            <ActionBar>
            <button
                onClick={handleCreateStudent}
                className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
            >
                Create Student
            </button>

            </ActionBar>

        </Section>

        </div>
    );
};

export default AddStudentPage;