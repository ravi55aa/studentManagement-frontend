import { EDepartment, EmploymentStatus, Gender_types, TeacherDesignation } from "@/types/enums";

export interface IGetAllTeachers{
    teacherBio:ITeacherBio[],
    teachersSchoolData:ITeacher[]
}


export interface ITeacherBio {
    _id:string|null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    qualification: string | null;
    dateOfBirth: Date | null;
    profilePhoto?: File|string | null;
    experience: number | null;
    gender: Gender_types|null;
    documents:(File|string)[]|[]; 
    tenantId:string|null;
}

export interface ITeacher {
    teacherId: string | null;
    academicYearId: string | null;
    employeeId: string | null;
    classTeacherOf: string | null;
    employmentStatus: EmploymentStatus | null;
    assignedSubjects: string[]|null;
    designation: TeacherDesignation | null;
    department: EDepartment[] | null;
    dateOfLeaving: Date | null;
    dateOfJoining: Date | null;
    centerId: string | null;
}


const teacherBio=["creating teacherBio is complete withValidation"]

const teacher = {
    pending:"validation is pending",
}

console.table(teacher,teacherBio);