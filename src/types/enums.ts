import z from "zod"

export enum Gender_types {
    Male='male',
    Female='female',
    Other='other'
}

export enum EmploymentStatus{
    Active="active",
    INACTIVE = "inactive",
    ON_LEAVE = "on_leave",
    RESIGNED = "resigned",
    TERMINATED = "terminated",
}
export enum TeacherDesignation {
    Teacher='teacher',
    Assistant_teacher='assistant_teacher',
    Head_of_department="head_of_department",
    Head_Master='head_Master'
}

export enum EDepartment {
    MATHEMATICS = "mathematics",
    SCIENCE = "science",
    ENGLISH = "english",
    SOCIAL_SCIENCE = "social science",
    LANGUAGES = "languages",
    COMPUTER_SCIENCE = "computer science",
    PHYSICAL_EDUCATION = "physical education",
    ARTS = "arts",
}

export const FeeTypeEnum = z.enum([
    "COURSE",
    "ANNUAL",
    "EXAM",
    "CENTER",
    "OTHER",
]);

export const AppliesModelEnum = z.enum([
    "Course",
    "School",
    "Exam",
    "Center",
]);