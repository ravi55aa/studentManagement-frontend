import { HomeWorkStatus } from "@/types/homework.status";
import { IAcademicSubject } from "./ISchool";

export interface IHomework {
    _id?:string;
    title: string;
    description: string;
    attachments?: File[] | {fileName:string,url:string};
    
    subjectId: string|IAcademicSubject;
    batchId: string;
    teacherId: string;
    
    status:HomeWorkStatus
    dueDate: Date;
    isDelete:boolean

    createdAt?: Date;
    updatedAt?: Date;
}

export interface Attachment {
    file: File;
    type: string;
}