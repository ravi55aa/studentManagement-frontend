import { HomeWorkStatus } from "@/types/homework.status";

export interface IHomework {
    title: string;
    description: string;
    attachments?: unknown[];
    
    subjectId: string;
    batchId: string;
    teacherId: string;
    
    status:HomeWorkStatus
    dueDate: Date;
    isDelete:boolean

    createdAt?: Date;
    updatedAt?: Date;
}