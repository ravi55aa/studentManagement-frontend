import HomePage from "@/pages/HomePage"
import NotFound from "./pages/NotFound"

import Register from "./pages/Auth/Register.page"
import Login from "./pages/Admin/SignIn"

import CreateSchool from "./pages/School/CreateSchool"
import AddAddress from "./pages/School/AddAddress.page"
import DocumentUpload from "./pages/School/DocumentUpload.page"
import Dashboard from "./pages/School/DashBoard.page"

import { Routes,Route } from "react-router-dom";
import SignInSchool from "./pages/School/SignIn.page"


//reset password
import { EmailVerify } from "@/pages/Auth"


const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="*" element={<NotFound/>} />
        

        //*admin login
        <Route path="/login" element={<Login/>}  />
        <Route path="/register" element={<Register/>}  />

        //*password Reset
        <Route path="/reset/emailVerify" element={<EmailVerify/>}/>


        //*create school
        <Route path="/school/register" element={<CreateSchool/>}  />
        <Route path="/createSchool/address" element={<AddAddress/>}  />
        <Route path="/createSchool/uploadDocuments" element={<DocumentUpload/>}  />
        <Route path="/school/signin" element={<SignInSchool/>}  />
        



        <Route path="/school/dashboard" element={<Dashboard/>}  />

      </Routes>
    </div>
  )
}


export default App