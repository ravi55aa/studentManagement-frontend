import {
  /*Super Admin */
  SuperAdminLogin,
  SuperAdminDashboard,
  AddSubscription,
  Subscriptions,
  SuperAdminSchools,

  HomePage,
  NotFound,
  Register,
  Login,
  SignInSchool,
  CreateSchool,
  AddAddress,
  DocumentUpload,
  DashboardHome,
  Dashboard,
  ViewSchool,
  Fees,
  AddFees,
  EditFees,
  FeesStudentsList,
  Centers,
  AddCenter,
  EditCenter,
  Batches,
  AddBatches,
  EditBatches,
  EnrollBatches,
  AcademicYear,
  AcademicAddYear,
  AcademicEditYear,
  AcademicSubjects,
  AcademicSubjectsAdd,
  AcademicCourses,
  AcademicCoursesAdd,
  AcademicCoursesEdit,
  AddNotifications,
  Notifications,
  
  /*teacher*/
  Teachers,
  TeacherLogin,
  AddTeachers,
  TeacherHomeworks,
  VerifyHomeworkSubmissions,
  ListBatches,
  MarkAttendance,
  TeacherSettingsPage,
  TeachersSubjects,

  /*student*/
  StudentLogin,
  AddStudent,
  StudentDashboard,
  HomeworkList,
  HomeworkSubmit,
  StudentSettingsPage,
  StudentAttendance,
  StudentFee,
  StudentCourse,
  StudentChat,

} from '@/pages/index';

import {TeacherDashboardMain,HomeworkAdd, TeacherDashboard} from '@/pages/Teacher/index'

import { Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { EmailVerify, OTP, PasswordReset } from '@/pages/Auth';
import EditTeacherPage from './pages/Teacher/Edit.Teacher.page';
import CheckoutPage from './components/Stripe.Checkout.page'; 
import PaymentSuccess from './components/Success.Component';
import { ProtectedRoute, PublicRoute } from './utils/protectedRoutes';

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/*.*/}
        
        <Route path="*" element={<NotFound />} />
        
        <Route element={<PublicRoute redirectPath='/admin/dashboard' />}>
          <Route path="/login" element={<SuperAdminLogin />} />
        </Route>


        <Route element={<PublicRoute />}>
          {/* SuperAdminLogin */}


          {/* admin login */}
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />

          {/* AUTH-LOGIN */}
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/student/login" element={<StudentLogin />} />


          {/* password Reset */}
          <Route path="/passwordReset/emailVerify" element={<EmailVerify />} />
          <Route path="/passwordReset/otp" element={<OTP />} />
          <Route path="/passwordReset" element={<PasswordReset />} />


          {/*.*/}
          {/*LOGIN-REGISTER*/}
            <Route path="/school/login" element={<SignInSchool />} />
            <Route path="/school/register" element={<CreateSchool />} />
            <Route path="/school/register/address" element={<AddAddress />} />
            <Route path="/school/register/uploadDocuments" element={<DocumentUpload />} />
        </Route>

        {/*.*/}
        {/*STRIPE*/}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-status" element={<PaymentSuccess />} />

        
        {/*.*/}
        <Route element={<ProtectedRoute />} >

        {/* SCHOOL */}

          <Route path="/school/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="centers" element={<Centers />} />
            <Route path="centers/add" element={<AddCenter />} />
            <Route path="centers/edit/:id" element={<EditCenter />} />
            
            <Route path="batches"  >
              <Route index element={<Batches />} />
              <Route path="add" element={<AddBatches />} />
              <Route path="edit/:id" element={<EditBatches />} />

              <Route path="enroll/:batchId"  >
              <Route index element={<EnrollBatches />} />
              <Route path="addStudents" element={<AddStudent />} />
              </Route>
            </Route>

            <Route path="academics">
              <Route index element={<AcademicYear />} />
              <Route path="add" element={<AcademicAddYear />} />
              <Route path="edit/:id" element={<AcademicEditYear />} />

              <Route path="subjects" element={<AcademicSubjects />} />
              <Route path="subjects/add" element={<AcademicSubjectsAdd />} />
              <Route path="subjects/edit/:subjectId" element={<AcademicSubjectsAdd />} />

              <Route path="courses" element={<AcademicCourses />} />
              <Route path="courses/add" element={<AcademicCoursesAdd />} />
              <Route path="courses/edit/:id" element={<AcademicCoursesEdit />} />
            </Route>
            <Route path="settings" element={<ViewSchool />} />

            <Route path="teachers">
              <Route index element={<Teachers />} />

              <Route path="add" element={<AddTeachers />} />
              <Route path="edit/:id" element={<EditTeacherPage />} />

            </Route>

            <Route path="fees">
              <Route index element={<Fees />} />
              <Route path="add" element={<AddFees />} />
              <Route path="edit/:id" element={<EditFees />} />
              <Route path="students" element={<FeesStudentsList />} />
            </Route>

            <Route path="notifications">
              <Route index element={<Notifications />} />
              <Route path="add" element={<AddNotifications />} />
            </Route>
          </Route>


        {/* TEACHER */}

        <Route path='/teacher/dashboard' element={<TeacherDashboardMain/>} > 
          <Route index element={<TeacherDashboard />} />

          <Route path="homework" >
            <Route index element={<TeacherHomeworks />} />
            <Route path="add" element={<HomeworkAdd />} />
            <Route path="edit/:homeworkId" element={<HomeworkAdd />} />
            <Route path="view/submissions/:homeworkId" element={<VerifyHomeworkSubmissions />} />
          </Route>

          <Route path='subject' element={<TeachersSubjects/>} />

          <Route path="batches" >
            <Route index element={<ListBatches />} />
            <Route path=":batchId/markAttendance" element={<MarkAttendance />} />
          </Route>
          
          <Route path="chat" element={<StudentChat />} />

          <Route path="setting" element={<TeacherSettingsPage />} />
        </Route>



        {/* STUDENT */}

        <Route path='/student/dashboard' element={<StudentDashboard/>}>
          <Route index element={<DashboardHome/>} />
          <Route path="homework"  >
            <Route index element={<HomeworkList />} />
            <Route path="add/:homeworkId" element={<HomeworkSubmit />} />
          </Route>
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="courses" element={<StudentCourse />} />
          <Route path="fee" element={<StudentFee />} />
          <Route path="chat" element={<StudentChat />} />
          <Route path="setting" element={<StudentSettingsPage />} />
        </Route>
        </Route>

        {/*.*/}
        {/* SuperAdmin */}
        <Route element={<ProtectedRoute redirectPath='/login' />} >
        <Route path="/dashboard" element={<SuperAdminDashboard />} >
            <Route index element={<DashboardHome />} />
            
            <Route path='plans' >
              <Route index element={<Subscriptions />} />
              <Route path='add' element={<AddSubscription />} />  
              <Route path='edit/:planId' element={<AddSubscription />} />  
            </Route>
            <Route path='schools' element={<SuperAdminSchools />} />
        </Route>
        </Route>
        
      </Routes>
    </div>
  );
};

export default App;
