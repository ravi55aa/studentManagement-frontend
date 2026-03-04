import * as z from 'zod';

import { EDepartment, EmploymentStatus, Gender_types, TeacherDesignation } from '@/types/enums';

const genderEnum = z.nativeEnum(Gender_types).optional();

export const teacherBioFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long')
    .optional(),

  lastName: z
    .string()
    .min(1, 'Last name must be at least 1 character')
    .max(50, 'Last name is too long')
    .optional()
    .nullable(),

  email: z.string().email('Enter a valid email address').optional().nullable(),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid phone number')
    .optional()
    .nullable(),

  qualification: z
    .string()
    .min(3, 'Qualification is Required')
    .max(100, 'Qualification is too long')
    .optional()
    .nullable(),

  dateOfBirth: z.coerce.date().optional(),

  experience: z.coerce
    .number()
    .min(1, 'Min 1 year of experience is required')
    .max(50, 'Experience seems invalid')
    .optional(),

  gender: genderEnum,
});

export const teacherAssignmentSchema = z
  .object({
    employmentStatus: z.nativeEnum(EmploymentStatus).optional(),

    assignedSubjects: z.array(z.string()).optional(),

    designation: z.nativeEnum(TeacherDesignation).optional(),

    department: z.array(z.nativeEnum(EDepartment)).optional(),

    dateOfJoining: z.coerce.date().optional(),

    dateOfLeaving: z.coerce.date().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.designation !== TeacherDesignation.Head_Master) {
      if (!data.department) {
        ctx.addIssue({
          path: ['department'],
          code: z.ZodIssueCode.custom,
          message: 'Department is required',
        });
      }

      if (!data.assignedSubjects || data.assignedSubjects.length === 0) {
        ctx.addIssue({
          path: ['assignedSubjects'],
          code: z.ZodIssueCode.custom,
          message: 'Subjects to handover is required',
        });
      }
    }
  });
