import { Gender_types } from "@/types/enums";
import { Student_Status } from "@/types/student.types";

export interface IStudent {
    name: string | null;
    email: string | null;
    password: string | null;
    phone: string | null;
    gender: Gender_types;
    dateOfBirth: string | null;
    parentName:string|null;
    parentPhone:string|null;
    status: Student_Status;
    profile: string | File | null;
    _id?: string | null;
}


export interface IStudentFee {
    studentId: string;
    feeId: string;
    status: 'paid' | 'pending';
    amountPaid?: number;
    paidAt?: Date;
}