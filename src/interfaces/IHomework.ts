import { HomeWorkStatus } from "@/types/homework.status";
import { IAcademicSubject } from "./ISchool";
import { IUploadedDoc } from "./IRegister";
import { IStudent } from "./IStudent";
import { IAttachment } from "@/components/HomeworkCard";

export interface IHomework {
    _id?:string;
    title: string;
    description: string;
    attachments?: File[] | IAttachment[];
    
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


export type HomeworkSubmitStatus="pending"| "verified" |"repeat" |"submitted";

export interface IHomeworkSubmission {
    _id?:string;
    studentId: string|IStudent;
    homeworkId: string;
    note?: string;
    remark?: string;
    attachments?: Attachment[] |IUploadedDoc[] ;
    links?: string[];
    status: HomeworkSubmitStatus;
    submittedAt: Date;
}