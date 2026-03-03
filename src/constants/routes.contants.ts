export enum forgotPassword{
    emailVerify="/auth/forgot-password/verifyEmail",
    generateOtp="/auth/forgot-password/generateOtp",
    verifyOtp="/auth/forgot-password/verifyOtp",
    updatePassword="/auth/forgot-password/updatePassword"
}

export enum SchoolRoute {
    login='/school/login',
    register='/school/register',
    register_add_Address='/school/register/addAddress',
    register__add_documents='/school/register/uploadDocument',


    viewSchool="/school/data/fetch",
    updateMeta="/school/update/meta",
    resetPassword="/password/reset",
}

export enum AddressRoute{
    getAll='/address/all',
    get="/address/get",
    edit="/address/edit",
}

export enum DocumentRoute{
    document="/documents",
    edit="/documents/edit/",
}

export enum CourseRoute{
    get="/school/academic/courses",
    add="/school/academic/courses/add",
    edit="/school/academic/courses/edit",
}

export enum SubjectRoute{
    get="/school/academic/subjects",
    add="/school/academic/subjects/add",
    edit="/school/academic/subjects/edit",
}

export enum BatchRoute{
    get="/school/batches",
    add="/school/batches/add",
    assignTeacher='/school/batch/assign-teacher',
    edit="/school/batches/edit",
}

export enum TeacherRoute{
    getAll="/teacher/all",
    getAllUnAssigned="/teacher/all/unAssigned",
    addBio="/teacher/bio/create",
    addProfessional="/teacher/create",
    edit="/teacher/edit",

    updateBio='/teacher/bio/update',
    updateProfessional='/teacher/update'
}

export enum CenterRoute{
    get="/school/centers",
    getAllUnAssigned="/teacher/all/unAssigned",
    add="/school/centers/add",
    assignTeacher='/school/batch/assign-teacher',
    edit="/school/centers/edit",
    addAddress="/school/centers/add/address",
}

export enum FeeRoute{
    get="/fee/get",
    delete="/fee/delete",
    getAll="/fee/get/all",
    edit="/fee/edit",
    add="/fee/add",
}

export enum YearRoute{
    get="/school/academicYears",
    add="/school/academicYears/add",
    edit="/school/academicYears/edit",
}

export enum NotificationRoutes{
    get_All='/notifications/get-all',
    newAdd='/notification/new'
}

export enum AdminRouter{
    register='/auth/admin/register',
    login='/auth/admin/login'
}