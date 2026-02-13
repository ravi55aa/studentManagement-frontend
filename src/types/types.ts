import { ITeacher, ITeacherBio } from "@/interfaces/ITeacher";

export type CheckboxListProps<T extends Record<string, unknown>> = {
    label: string;
    name: string;
    items: T[];
    labelKey: keyof T;
    valueKey: keyof T;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type Teachers= { 
    teacherBio:ITeacherBio|null,
    teacher:ITeacher|null
}

export type AssignTeacherModalProps = {
    open: boolean;
    teachers: ITeacherBio[];
    batchId: string;
    onClose: () => void;
    onAssign: (teacherId: string) => Promise<void>;
};