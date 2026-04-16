/*************** SCHOOL ****************/
export { default as 'HomePage' } from './HomePage';
export { default as 'NotFound' } from './NotFound';

export { default as 'Register' } from './Auth/Register.page';
export { default as 'Login' } from './Admin/SignIn';

export { default as 'SignInSchool' } from './School/SignIn.page';
export { default as 'CreateSchool' } from './School/CreateSchool';
export { default as 'AddAddress' } from './School/AddAddress.page';
export { default as 'DocumentUpload' } from './School/DocumentUpload.page';

export { default as 'DashboardHome' } from './School/DashBoardHome.page';
export { default as 'Dashboard' } from './School/DashBoard.page';

export { default as 'ViewSchool' } from './School/ViewSchool.page';

export { default as 'Centers' } from './School/Center/Center.page';
export { default as 'EditCenter' } from './School/Center/Center.edit.page';
export { default as 'AddCenter' } from './School/Center/CenterAdd.page';

export { default as 'Batches' } from './School/Batches/BatchesPage';
export { default as 'AddBatches' } from './School/Batches/Add.page';
export { default as 'EditBatches' } from './School/Batches/Edit.page';
export { default as 'EnrollBatches' } from './School/Batches/Enroll/Enroll.Students';


export { default as 'AcademicYear' } from './School/Academic/Year.page';
export { default as 'AcademicAddYear' } from './School/Academic/YearAdd.page';
export { default as 'AcademicEditYear' } from './School/Academic/YearEdit.page';

export { default as 'AcademicSubjects' } from './School/Academic/Subjects.page';
export { default as 'AcademicSubjectsAdd' } from './School/Academic/Subjects.add.page';

export { default as 'AcademicCourses' } from './School/Academic/Course/Courses.page';
export { default as 'AcademicCoursesAdd' } from './School/Academic/Course/Course.add.page';
export { default as 'AcademicCoursesEdit' } from './School/Academic/Course/Course.edit';

export { default as 'AddNotifications' } from '@/components/Notification/writeNotification.page';
export { default as 'Notifications' } from '@/components/Notification/Notification';

export { default as 'Fees' } from './School/Fees/Fees';
export { default as 'AddFees' } from './School/Fees/Fees.Add';
export { default as 'EditFees' } from './School/Fees/Fees.Edit';
export { default as 'FeesStudentsList' } from './School/Fees/fee.students';


/*************** TEACHER ****************/
export { default as 'TeacherLogin' } from './Auth/Teacher.sign';
export { default as 'Teachers' } from './Teacher/Teacher.main.page';
export { default as 'AddTeachers' } from './Teacher/Add.Teacher.page';
export { default as 'TeachersSubjects' } from './Teacher/Subject/ListSubjects.tsx';
export { default as 'TeacherHomeworks' } from './Teacher/Homework/List.Homework.tsx';
export { default as 'VerifyHomeworkSubmissions' } from './Teacher/Homework/VerifyHomeworkSubmissions.tsx';
export { default as 'TeacherSettingsPage' } from './Teacher/Profile.Teacher.tsx';
export { default as 'ListBatches' } from './Teacher/Attendance/ListBatches.tsx';
export { default as 'MarkAttendance' } from './Teacher/Attendance/Attendance.tsx';




/*************** STUDENT ****************/
export { default as 'StudentLogin' } from './Auth/Student.sign';
export {default as "AddStudent"} from "./Student/Add.Student";
export {default as 'StudentDashboard'} from "./Student/Student.Dashboard"
export {default as 'HomeworkList'} from "./Student/Homework/Homework.List.tsx"
export {default as 'HomeworkSubmit'} from "./Student/Homework/Homework.Submit.tsx"
export {default as 'StudentSettingsPage'} from "./Student/Profile.Student"
export {default as 'StudentAttendance'} from "./Student/Attendance/Attendance.tsx"
export {default as 'StudentFee'} from "./Student/Fee/Fee.Student.tsx"
export {default as 'StudentCourse'} from "./Student/Course/Course.Page.tsx"
export {default as 'StudentChat'} from "./Student/Chat/StudentChat.tsx"




/*************** Super-Admin ****************/

export { default as 'SuperAdminLogin' } from './Admin/SuperAdminLogin.tsx';
//subscription
export { default as 'SuperAdminDashboard' } from './Admin/Dashboard.tsx';
export { default as 'Subscriptions' } from './Admin/Subscription/List.plan.tsx';
export { default as 'AddSubscription' } from './Admin/Subscription/Add.plan.tsx';
export { default as 'SuperAdminSchools' } from './Admin/SchoolManagement/Schools.tsx';
