import HomePage from "@/pages/HomePage"
import NotFound from "./pages/NotFound"
import Login from "./pages/Auth/Login.page"
import CreateSchool from "./pages/Admin/CreateSchool"

import { Routes,Route } from "react-router-dom";

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/login" element={<Login/>}  />
        <Route path="/createSchool" element={<CreateSchool/>}  />

      </Routes>
    </div>
  )
}


export default App