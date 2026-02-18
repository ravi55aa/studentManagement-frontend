export enum FeeType {
    COURSE = "COURSE",
    ANNUAL = "ANNUAL",
    EXAM = "EXAM",
    CENTER = "CENTER",
    OTHER = "OTHER"
}


export interface IFee {
        _id:string
        name: string | null;
        code: string | null;
        status: string | null;
        totalAmount: number | null;
        dueDate: Date | null;
        currency: string | null;
        isDeleted:boolean | null;
        
        type:FeeType|null,
        appliesTo: {
            model:string,
            id:string
        }

        tenantId: string | null;
        autoReminder: {
            daysBeforeDue: number | null;
            enabled: boolean | null;
        };
    }