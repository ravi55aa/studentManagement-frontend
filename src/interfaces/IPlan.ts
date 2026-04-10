export interface IPlan extends Document {
    name: string;
    _id:string
    description?: string;

    amount: number;
    discount?: number; // percentage
    discountAmount?: number;

    finalAmount: number;

    duration: number; // in days (30, 90, 365)

    benefits: string[];

    maxStudents?: number;
    maxTeachers?: number;

    isActive: boolean;
    isPopular: boolean;
    createdAt: Date;
    updatedAt: Date;
}