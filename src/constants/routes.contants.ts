export enum forgotPassword {
  emailVerify = '/auth/forgot-password/verifyEmail',
  generateOtp = '/auth/forgot-password/generateOtp',
  verifyOtp = '/auth/forgot-password/verifyOtp',
  updatePassword = '/auth/forgot-password/updatePassword',
}

export enum SchoolRoute {
  login = '/school/login',
  register = '/school/register',
  register_add_Address = '/school/register/addAddress',
  register__add_documents = '/school/register/uploadDocument',

  viewSchool = '/school/data/fetch',
  updateMeta = '/school/update/meta',
  resetPassword = '/password/reset',
  delete = '/school/delete',
}

export enum AddressRoute {
  getAll = '/address/all',
  get = '/address/get',
  edit = '/address/edit',
}

export enum DocumentRoute {
  document = '/documents',
  edit = '/documents/edit/',
}

export enum CourseRoute {
  get = '/school/academic/courses',
  add = '/school/academic/courses/add',
  edit = '/school/academic/courses/edit',
}

export enum SubjectRoute {
  get = '/school/academic/subjects',
  add = '/school/academic/subjects/add',
  edit = '/school/academic/subjects/edit',
}

export enum HomeworkRoute {
  getall = '/teacher/homework/getall',
  get = '/teacher/homework/get',
  delete = '/teacher/homework/delete',
  add = '/teacher/homework',
  edit = '/teacher/homework',
}

export enum StudentHomeworkRoute {
  get = '/student/homework/get',
  getall = '/student/homework/getall',
  getallSubmissions = '/student/homework/getall/submission',
  submit = '/student/homework/submit',
  add = '/student/homework',
  edit = '/student/homework',
  update = '/student/homework/update',
  updateMany = '/student/homework/updateMany',
}

export enum BatchRoute {
  get = '/school/batches',
  add = '/school/batches/add',
  assignTeacher = '/school/batch/assign-teacher',
  edit = '/school/batches/edit',
}

export enum TeacherRoute {
  login='/teacher/login',

  getAll = '/teacher/all',
  getAllUnAssigned = '/teacher/all/unAssigned',
  addBio = '/teacher/bio/create',
  addProfessional = '/teacher/create',
  edit = '/teacher/edit',
  verifyTeacher = '/teacher/verify',

  updateBio = '/teacher/bio/update',
  updateProfessional = '/teacher/update',
}


export enum CenterRoute {
  get = '/school/centers',
  getAllUnAssigned = '/teacher/all/unAssigned',
  add = '/school/centers/add',
  assignTeacher = '/school/batch/assign-teacher',
  edit = '/school/centers/edit',
  addAddress = '/school/centers/add/address',
}

export enum FeeRoute {
  get = '/fee/get',
  delete = '/fee/delete',
  getAll = '/fee/get/all',
  edit = '/fee/edit',
  add = '/fee/add',
}

export enum YearRoute {
  get = '/school/academicYears',
  add = '/school/academicYears/add',
  edit = '/school/academicYears/edit',
}

export enum NotificationRoutes {
  getAll = '/notification/getAll',
  newAdd = '/notification/new',
}

export enum AdminRouter {
  register = '/auth/admin/register',
  login = '/auth/admin/login',
  login2 = '/auth/login',
}

export enum AuthRouter {
  register = '/auth/register',
  login = '/auth/login',
}

export enum StripeRouter {
  pay = '/stripe/create-payment-intent',
  webhook = '/stripe/webhook',
}

//Chat Router
export enum ChatRouter {
  createDirectChat = "/chat/direct",
  createBatchChat = "/chat/batch",
  
  getUserChats = "/chat/:userId",
  sendMessage = "/chat/message",
  getMessages = "/chat/messages/:chatRoomId",

  markAsRead = "/chat/read/:chatRoomId",
  unreadCount = "/chat/unread/:chatRoomId",
}


/**************** STUDENT ROUTER ****************/

export enum StudentRouter {
  login='/student/login',

  add = '/student/create',
  get = '/student/bio',
  addAddress = '/student/create/address',
  addDocuments = '/student/create/document',

  getAll = '/student/getall',
  getAllUnAssigned = '/student/all/unAssigned',
  edit = '/student/edit',
  verifyStudent = '/student/verify',

  update = '/student/update',
  updateProfessional = '/student/update',
  
  //Attendance
  updateAttendance = '/student/attendance/update',
  getallAttendances = '/student/attendance/getall',
  getAStudentList = '/student/attendance/getOne',
  getBatchAttendance = '/student/attendance/batch',

  applyLeave = '/student/applyLeave',
  getLeaveHistory = '/student/applyLeave',
  
  //studentFee
  studentPaidFeeDetails = '/student/fee/details',
}