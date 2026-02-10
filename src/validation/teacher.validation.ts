import * as z from "zod";

import { 
    EDepartment, 
    EmploymentStatus, 
    Gender_types, 
    TeacherDesignation 
} from "@/types/enums";


const genderEnum = z.nativeEnum(Gender_types).optional();


export const teacherBioFormSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name is too long")
        .optional(),

    lastName: z
        .string()
        .min(1, "Last name must be at least 1 character")
        .max(50, "Last name is too long")
        .optional()
        .nullable(),

    email: z
        .string()
        .email("Enter a valid email address")
        .optional()
        .nullable(),

    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Enter a valid phone number")
        .optional()
        .nullable(),

    qualification: z
        .string()
        .min(3, "Qualification is Required")
        .max(100, "Qualification is too long")
        .optional()
        .nullable(),

    dateOfBirth: z
        .coerce
        .date()
        .optional(),

    experience: 
        z.coerce.number()
        .min(1, "Min 1 year of experience is required")
        .max(50, "Experience seems invalid")
        .optional(),

    gender: genderEnum,
});


export const teacherAssignmentSchema = z.object({
    classTeacherOf: z
        .string()
        .min(1, "Please select a class")
        .optional(),

    employmentStatus: z
        .nativeEnum(EmploymentStatus)
        .optional(),

    assignedSubjects: z
        .array(z.string())
        .min(1, "At least one subject must be assigned").optional(),

    designation: z
        .nativeEnum(TeacherDesignation).optional(),

    department: z
        .array(z.nativeEnum(EDepartment))
        .min(1, "At least one department is required").optional(),

    dateOfJoining: z
        .coerce
        .date()
        .optional(),

    dateOfLeaving: z
    .coerce
    .date()
    .nullable(),
});
