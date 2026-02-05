//import { ICenter } from "./ICenter";

export interface IAcademicYear  {
    code: string | null;
    startDate: string | null;
    endDate: string | null;
    status: string | null;
    year?: string | null;
    _id:string|null;
    isActive:boolean|null
}


export interface ICenterForm {
    name: string;
    code: string;
    phone?: string;
    email?: string;
    headInCharge?: string;
    currentStrength?: string;
    totalCapacity?: string;
    type?: string;
    isMain: boolean;
    isActive: boolean;
}

export interface IBatches {
    tenantId: string | null;
    adminId: string | null;
    name: string | null;
    code: string | null;
    status: string | null;
    course: string | null;
    center: string | null;
    batchCounselor: string | null;
    schedule: {
        endTime: string | null;
        startTime: string | null;
    };
    academicYear: string | null;
    _id:string
}


export interface IAcademicSubject {
    name: string;
    code: string;
    className: string;
    type: "theory" | "practical" | "both";

    maxMarks: number;
    passMarks?: number;

    tenantId: string;
    adminId: string;
    academicYear: string;

    description: string;
    department?: string;

    batchesToFollow: string[];

    credits?: number;
    level?: "primary" | "secondary" | "higher-secondary" | "degree";

    referenceBooks?: string[]; // URLs
    syllabusUrl?: string;

    status?: "active" | "inactive";

    createdAt: Date;
    updatedAt: Date;
    _id:string
}


/*****COURSES */
export interface IAcademicCourse {
    name: string | null;
    tenantId: string | null;
    academicYear: string | null;
    code: string | null;
    description: string | null;
    level: string | null;
    duration: {
        value: string | null;
        unit: string | null;
    };
    schedule: {
        endDate: Date | null;
        startDate: Date | null;
    };
    adminId: string | null;
    status: string | null;
    _id:string
}


//**********COURSE_META**********
// enum Course_subject_type{
//     ACADEMIC="ACADEMIC",
//     CUSTOM="CUSTOM"
// }

// export interface Course_meta_subject{
//     subjectType:Course_subject_type,
//     subjectRef:string[] | null,
//     customSubjectName:string[] | null
// }

export interface IAcademicCourseMeta {
    subjects: string[] | null;
    coordinators: string[] | null;
    eligibilityCriteria: string | null;
    attachments: unknown[];
    batches: string[] | null;
    syllabusUrl?: string | null;
    maxStudents: string | null;
    courseId: string | null;
    enrollmentOpen: string | null;
    _id:string
}


export interface IResetPassword{
        pass1:string,
        pass2:string
    }