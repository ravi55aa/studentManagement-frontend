
  import {
  HomePage ,
  NotFound ,

  Register ,
  Login , SignInSchool ,CreateSchool , AddAddress ,
  DocumentUpload ,
  DashboardHome ,Dashboard ,
  
  ViewSchool ,
  Fees,AddFees,
  Centers ,AddCenter,EditCenter ,
  Batches ,AddBatches ,EditBatches ,
  AcademicYear , AcademicAddYear, AcademicEditYear ,
  AcademicSubjects ,AcademicSubjectsAdd, AcademicSubjectsEdit ,
  AcademicCourses,AcademicCoursesAdd ,AcademicCoursesEdit,

  Teachers,AddTeachers,

  Notifications
} from "@/pages/index"


import { Routes,Route } 
  from "react-router-dom";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { EmailVerify,OTP,PasswordReset } from "@/pages/Auth"
import EditTeacherPage from "./pages/Teacher/Edit.Teacher.page";
import CheckoutPage from "./components/Stripe.Checkout.page";
import PaymentSuccess from "./components/Success.compo";






const App = () => {

  return (
    <div>

      

    <ToastContainer position="top-right" autoClose={3000}/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="*" element={<NotFound/>} />
        

        //*admin login
        <Route path="/login" element={<Login/>}  />
        <Route path="/register" element={<Register/>}  />

        //*password Reset
        <Route path="/passwordReset/emailVerify" element={<EmailVerify/>}/>
        <Route path="/passwordReset/otp" element={<OTP/>}/>
        <Route path="/passwordReset" element={<PasswordReset/>}/>

        //*strip
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />


        //*school
        <Route path="/school/login" element={<SignInSchool/>}  />

        <Route path="/school/register" element={<CreateSchool/>}  />
        <Route path="/school/register/address" element={<AddAddress/>}  />
        <Route path="/school/register/uploadDocuments" element={<DocumentUpload/>}  />
        



        <Route path="/school/dashboard" element={<Dashboard/>}  >
          <Route index element={<DashboardHome/>}  />
          <Route path="centers" element={<Centers/>}  />
          <Route path="centers/add" element={<AddCenter/>}  />
          <Route path="centers/edit/:id" element={<EditCenter/>}  />
          <Route path="batches" element={<Batches/>}  />
          <Route path="batches/add" element={<AddBatches/>}  />
          <Route path="batches/edit/:id" element={<EditBatches/>}  />
          
          <Route path="academics"> 
            <Route index element={<AcademicYear/>}  />
            <Route path="add" element={<AcademicAddYear/>}  />
            <Route path="edit/:id" element={<AcademicEditYear/>}  />

            <Route path="subjects" element={<AcademicSubjects/>}  />
            <Route path="subjects/add" element={<AcademicSubjectsAdd/>}  />
            <Route path="subjects/edit/:id" element={<AcademicSubjectsEdit/>}  />

            <Route path="courses" element={<AcademicCourses/>}  /> 
            <Route path="courses/add" element={<AcademicCoursesAdd/>}  /> 
            <Route path="courses/edit/:id" element={<AcademicCoursesEdit/>}  /> 
          </Route>
            <Route path="settings" element={<ViewSchool/>}  /> 

          <Route path="teachers"> 
            <Route index element={<Teachers/>}  />
            <Route path="add" element={<AddTeachers/>}  />
            <Route path="edit/:id" element={<EditTeacherPage/>}  />
          </Route>
          
          <Route path="fees"> 
            <Route index element={<Fees/>}  />
            <Route path="add" element={<AddFees/>}  />
          </Route>

          <Route path="notifications" element={<Notifications/>}  />

        </Route>


      </Routes>
    </div>
  )
}


export default App