import { AttendanceStatus } from "@/types/student.types";

export interface IStudentAttendance{
    studentId: string;
    status:AttendanceStatus ;
    remark: string
}

export interface IStudentAttendanceMain{
    batchId: string;
    date: Date;
    teacherId: string;
    students: IStudentAttendance[];
}

export interface ILeaveDocument {
    reason: string;
    body: string;
    attachment?: File|string;
    date: Date|null|undefined;
}