import React from "react";
import { Navigate } from "react-router-dom";


export const RegisterProtectedRoute=({children})=>{
    //Browser i cant use the cookie
    //i cant use the session
    //Better to moving on into the browser to handle it.
    
    // i can i do with the session by the way
    const token:string|null = 
        localStorage.getItem("token");

    return token ? children : <Navigate to="/Login" />
}
