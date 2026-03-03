export const employmentStatusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'On Leave', value: 'on_leave' },
    { label: 'Resigned', value: 'resigned' },
    { label: 'Terminated', value: 'terminated' },
];

export const teacherDesignationOptions = [
    { label: 'Teacher', value: 'teacher' },
    { label: 'Assistant Teacher', value: 'assistant_teacher' },
    { label: 'Head of Department', value: 'head_of_department' },
    { label: 'Head Master', value: 'head_Master' },
];

export const department = [
    { label: 'MATHEMATICS', value: 'mathematics' },
    { label: 'SCIENCE', value: 'science' },
    { label: 'ENGLISH', value: 'english' },
    { label: 'SOCIAL_SCIENCE', value: 'social science' },
    { label: 'ENGLISH', value: 'english' },
    { label: 'LANGUAGES', value: 'languages' },
    { label: 'COMPUTER_SCIENCE', value: 'computer science' },
    { label: 'PHYSICAL_EDUCATION', value: 'physical education' },
    { label: 'ARTS', value: 'arts' },
];

export const teachers = [
    {
        id: '1',
        name: 'Kristin Watson',
        facultyNo: '1001',
        phone: '9878675645',
        email: 'michelle.rivera@example.com',
        gender: 'Male',
        avatar: 'https://i.pravatar.cc/40?img=1',
    },
    {
        id: '2',
        name: 'Marvin McKinney',
        facultyNo: '1051',
        phone: '9878675645',
        email: 'debbie.baker@example.com',
        gender: 'Male',
        avatar: 'https://i.pravatar.cc/40?img=2',
    },
    {
        id: '3',
        name: 'Jane Cooper',
        facultyNo: '1034',
        phone: '9878675645',
        email: 'kenzi.lawson@example.com',
        gender: 'Female',
        avatar: 'https://i.pravatar.cc/40?img=3',
    },
    {
        id: '4',
        name: 'Cody Fisher',
        facultyNo: '1065',
        phone: '9878675645',
        email: 'nathan.roberts@example.com',
        gender: 'Male',
        avatar: 'https://i.pravatar.cc/40?img=4',
    },
];

export const school_Departments = [
    'MATHEMATICS',
    'SCIENCE',
    'SOCIAL_SCIENCE',
    'ENGLISH',
    'LANGUAGES',
    'COMPUTER_SCIENCE',
    'PHYSICAL_EDUCATION',
    'ARTS',
];

export const addTeacher_Professional_Form_Fields = [
    {
        name: "employmentStatus",
        label: "Employment Status",
        placeholder: "Select employment status",
        type: "select",
    },
    {
        name: "designation",
        label: "Designation",
        placeholder: "Select designation",
        type: "select",
    },
    {
        name: "academicYearId",
        label: "Academic Year",
        placeholder: "Select academic year",
        type: "select",
    },
    {
        name: "assignedSubjects",
        label: "Assigned Subjects",
        placeholder: "Select assigned subjects",
        type: "multiselect",
    },
    {
        name: "department",
        label: "Department",
        placeholder: "Select department",
        type: "multiselect",
    },
    {
        name: "dateOfJoining",
        label: "Date of Joining",
        placeholder: "Select date of joining",
        type: "date",
    },
    {
        name: "dateOfLeaving",
        label: "Date of Leaving",
        placeholder: "Select date of leaving",
        type: "date",
    },
    {
        name: "center",
        label: "Center",
        placeholder: "Select center",
        type: "select",
    },
    {
        name: "modelType",
        label: "Model Type",
        placeholder: "Enter model type",
        type: "text",
    },
];

