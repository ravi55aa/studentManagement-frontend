/**
 * If(User not found) show label 
 * show error message in <span>
 * store user password as bcrypt
 * while login check user with both email+password
 */


import React, {  useState } 
    from "react";
import { useNavigate, Link } 
    from "react-router-dom";
import { handleValidationOF } 
    from "@/validation/validateFormData";
import { school_LoginIn_Schema } 
    from "@/constants/createSchool";
import {InputField }
    from "@/components";
import { schoolSignInSchema } 
    from "@/validation/school.validator";
import { handleSchoolSignIn } 
    from "@/api/school.api";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { storeCurrentUser } from "@/utils/Redux/Reducer/currentUser.reducer";






const SignInSchool = () => {

    const navigate = useNavigate();
    const dispatch=useAppDispatch();

    const [form, setForm] = useState({
        schoolName: "",
        password: ""
    });

    const [error, setError] = useState("");




    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        document.getElementById(e.target.name).textContent="";
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formIsValidated = handleValidationOF(schoolSignInSchema,form);
        
        if(!formIsValidated) return false;

        setError("");

        const res = await handleSchoolSignIn(form);

        //here update the new code
        if(!res.success){
            setError(res.error.message);
        }

        const user={id:res.data._id,role:"Admin"};
        dispatch(storeCurrentUser(user));

        navigate("/school/dashboard");

        return res.success;
    };

    const handleForgotPassword=()=>{
        return navigate("/forgot-password");
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center w-full max-w-md">

            {/* Heading */}
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Welcome, Log into your School account
            </h1>

            <p className="text-gray-500 mb-8 text-sm">
            It is our great pleasure to have <br /> you on board!
            </p>

            {/* Error Message */}
            {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {school_LoginIn_Schema.map((ele,i)=>{
                    return (
                    <InputField 
                    key={i}
                    uniqueKey={ele.name+i+i+i}
                    onChange={handleInputChange}
                    name={ele.name}
                    type={ele.type}
                    placeholder={ele.placeholder}
                    />
                )})}
            
            <button 
            onClick={handleForgotPassword}
            type="button" 
            className="text-sm ps-2 text-end! w-[100]">
                forgot password
            </button>
            

            <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded-md font-medium hover:bg-green-800 transition"
            >
                Login
            </button>
            </form>

            {/* Footer */}
            <p className="text-xs text-gray-500 mt-6">
            Haven't created the school yet?{" "}
            <Link to="/school/register" className="text-green-700 font-semibold">
                Register
            </Link>
            </p>
        </div>
        </div>
    );
};

export default SignInSchool;
