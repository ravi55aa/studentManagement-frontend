export interface SidebarItemConfig {
    label: string;
    path: string;
    children?: SidebarItemConfig[];
}


export const schoolPath="/school/dashboard/";

export const schoolSidebarLinks:SidebarItemConfig[] = [
    {
        label: "Dashboard",
        path: "",
    },
    {
        label: "Students",
        path: "students",
    },
    {
        label: "Teachers",
        path: "teachers",
    },
    {
        label: "Batches",
        path: "batches",
    },
    {
        label: "Exams",
        path: "exams",
        children: [
        { label: "Exams", path: "exams" },
        { label: "Results", path: "results" },
        { label: "Schedule Exam", path: "schedule-exam" },
        { label: "Exam Structure", path: "exam-structure" },
        ],
    },
    {
        label: "Academics",
        path: "academics",
        children: [
        { label: "Academic Years", path: "" },
        { label: "Subjects", path: "subjects" },
        { label: "Courses", path: "courses" },
        ],
    },
    {
        label: "Centers",
        path: "centers",
    },
    {
        label: "Notifications",
        path: "notifications",
    },
    {
        label: "Fees",
        path: "fees",
    },
    {
        label: "Chat",
        path: "chat",
    },
    {
        label: "Holidays",
        path: "holidays",
    },
    {
        label: "Settings",
        path: "settings",
    },
] as const;

