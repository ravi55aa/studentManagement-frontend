import {lazy} from 'react';


/*************** COMMON ****************/
export const HomePage = lazy(() => import('./HomePage'));
export const NotFound = lazy(() => import('./NotFound'));

export const Register = lazy(() => import('./Auth/Register.page'));
export const Login = lazy(() => import('./Admin/SignIn'));

/*************** SCHOOL ****************/
export const SignInSchool = lazy(() => import('./School/SignIn.page'));
export const CreateSchool = lazy(() => import('./School/CreateSchool'));
export const AddAddress = lazy(() => import('./School/AddAddress.page'));
export const DocumentUpload = lazy(() => import('./School/DocumentUpload.page'));

export const SchoolDashboardMainSection = lazy(
  () => import('./School/Dashboard/Dashboard.section.tsx')
);

export const DashboardSection1 = lazy(
  () => import('./School/DashBoardHome.page.tsx')
);

export const Dashboard = lazy(
  () => import('./School/DashBoard.page.tsx')
);

export const ViewSchool = lazy(
  () => import('./School/ViewSchool.page')
);

export const Centers = lazy(
  () => import('./School/Center/Center.page')
);

export const EditCenter = lazy(
  () => import('./School/Center/Center.edit.page')
);

export const AddCenter = lazy(
  () => import('./School/Center/CenterAdd.page')
);

export const Batches = lazy(
  () => import('./School/Batches/BatchesPage')
);

export const AddBatches = lazy(
  () => import('./School/Batches/Add.page')
);

export const EditBatches = lazy(
  () => import('./School/Batches/Edit.page')
);

export const EnrollBatches = lazy(
  () => import('./School/Batches/Enroll/Enroll.Students')
);

export const AcademicYear = lazy(
  () => import('./School/Academic/Year.page')
);

export const AcademicAddYear = lazy(
  () => import('./School/Academic/YearAdd.page')
);

export const AcademicEditYear = lazy(
  () => import('./School/Academic/YearEdit.page')
);

export const AcademicSubjects = lazy(
  () => import('./School/Academic/Subjects.page')
);

export const AcademicSubjectsAdd = lazy(
  () => import('./School/Academic/Subjects.add.page')
);

export const AcademicCourses = lazy(
  () => import('./School/Academic/Course/Courses.page')
);

export const AcademicCoursesAdd = lazy(
  () => import('./School/Academic/Course/Course.add.page')
);

export const AcademicCoursesEdit = lazy(
  () => import('./School/Academic/Course/Course.edit')
);

export const AddNotifications = lazy(
  () => import('@/components/Notification/writeNotification.page')
);

export const Notifications = lazy(
  () => import('@/components/Notification/Notification')
);

export const Fees = lazy(
  () => import('./School/Fees/Fees')
);

export const AddFees = lazy(
  () => import('./School/Fees/Fees.Add')
);

export const EditFees = lazy(
  () => import('./School/Fees/Fees.Edit')
);

export const FeesStudentsList = lazy(
  () => import('./School/Fees/fee.students')
);

/*************** TEACHER ****************/
export const TeacherLogin = lazy(
  () => import('./Auth/Teacher.sign')
);

export const Teachers = lazy(
  () => import('./Teacher/Teacher.main.page')
);

export const AddTeachers = lazy(
  () => import('./Teacher/Add.Teacher.page')
);

export const TeachersSubjects = lazy(
  () => import('./Teacher/Subject/ListSubjects.tsx')
);

export const TeacherHomeworks = lazy(
  () => import('./Teacher/Homework/List.Homework.tsx')
);

export const VerifyHomeworkSubmissions = lazy(
  () => import('./Teacher/Homework/VerifyHomeworkSubmissions.tsx')
);

export const TeacherSettingsPage = lazy(
  () => import('./Teacher/Profile.Teacher.tsx')
);

export const ListBatches = lazy(
  () => import('./Teacher/Attendance/ListBatches.tsx')
);

export const MarkAttendance = lazy(
  () => import('./Teacher/Attendance/Attendance.tsx')
);

/*************** STUDENT ****************/
export const StudentLogin = lazy(
  () => import('./Auth/Student.sign')
);

export const AddStudent = lazy(
  () => import('./Student/Add.Student')
);

export const StudentDashboardMain = lazy(
  () => import('./Student/Student.Dashboard')
);

export const StudentDashboard = lazy(
  () => import('./Student/Dashboard/StudentDashboard.tsx')
);

export const HomeworkList = lazy(
  () => import('./Student/Homework/Homework.List.tsx')
);

export const HomeworkSubmit = lazy(
  () => import('./Student/Homework/Homework.Submit.tsx')
);

export const StudentSettingsPage = lazy(
  () => import('./Student/Profile.Student')
);

export const StudentAttendance = lazy(
  () => import('./Student/Attendance/Attendance.tsx')
);

export const StudentFee = lazy(
  () => import('./Student/Fee/Fee.Student.tsx')
);

export const StudentCourse = lazy(
  () => import('./Student/Course/Course.Page.tsx')
);

export const StudentChat = lazy(
  () => import('./Student/Chat/StudentChat.tsx')
);

/*************** SUPER ADMIN ****************/
export const SuperAdminLogin = lazy(
  () => import('./Admin/SuperAdminLogin.tsx')
);

export const SuperAdminDashboard = lazy(
  () => import('./Admin/Dashboard.tsx')
);

export const SuperAdminDashboardHome = lazy(
  () => import('./Admin/Dashboard/Dashboard.tsx')
);

export const Subscriptions = lazy(
  () => import('./Admin/Subscription/List.plan.tsx')
);

export const AddSubscription = lazy(
  () => import('./Admin/Subscription/Add.plan.tsx')
);

export const SuperAdminSchools = lazy(
  () => import('./Admin/SchoolManagement/Schools.tsx')
);
