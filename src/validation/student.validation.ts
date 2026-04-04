import { z } from "zod";
import { genderEnum, uploadedDocSchema } from "./teacher.validation";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createStudentSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be under 50 characters")
        .regex(/^[A-Za-z ]+$/, "Name should contain only letters"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password must not exceed 12 characters"),

    email: z
        .string()
        .trim()
        .email("Invalid email format")
        .max(100, "Email must be under 100 characters")
        .optional(),

    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Phone must be a valid 10 digit number")
        .optional(),

    gender: genderEnum,

    dateOfBirth: z
        .string()
        .optional()
        .refine(
        (date) => {
            if (!date) return true;
            return new Date(date) < new Date();
        },
        { message: "Date of birth must be in the past" }
        ),

    profile: z
        .union([
            z.string().url("Profile must be a valid URL"),
            z.instanceof(File)
        ])
        .optional().nullable(),

    parentName: z
        .string()
        .trim()
        .min(3, "Parent name must be at least 3 characters")
        .max(40, "Parent name must be under 40 characters")
        .regex(/^[A-Za-z ]+$/, "Parent name should contain only letters")
        .optional(),

    parentPhone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Parent phone must be a valid 10 digit number")
        .optional(),

    status: z
        .enum(["active", "inactive", "graduated", "suspended"])
        .optional(),
});

export const leaveSchema = z.object({
    reason: z
        .string()
        .trim()
        .min(5, "Reason is required"),

    body: z
        .string()
        .trim()
        .min(10, "Body is required"),

    attachment: z
        .union([
        z.instanceof(File).nullable(),
        , // for file upload
        z.string().url("Attachment must be a valid URL"),
        ])
        .optional(),

    date: z
        .date()
        .nullable()
        .optional(),
});