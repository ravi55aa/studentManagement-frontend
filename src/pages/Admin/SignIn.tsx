/**
 * If(User not found) show label 
 * show error message in <span>
 * store user password as bcrypt
 * while login check user with both email+password
 */


import React, { useState } 
    from "react";
import { handleAdminSignIn } 
    from "@/api/auth.api";
import { useNavigate, Link } 
    from "react-router-dom";
import { signInSchema } 
    from "@/validation/register.schema"; 
import { handleValidationOF } 
    from "@/validation/validateFormData";




const SignIn = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        document.getElementById(e.target.name).textContent="";
        setForm({ ...form, [e.target.name]: e.target.value });

    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formIsValidated=handleValidationOF(signInSchema,form);
        if(!formIsValidated){
            return false;
        }

        setError("");

        const res = await handleAdminSignIn(form);

        if(res.success){
            navigate("/school/signin");
        }

        setError(res.error.message);
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
            Welcome, Log into your account
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

            <div className="text-start">
            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700"
            />
            <span id="email" className="ps-2 text-red-500"></span>
            </div>


            <div className="text-start">
            <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700"
            />
            <button 
            onClick={handleForgotPassword}
            type="button" 
            className="text-sm ps-2 text-end! w-[100]">
                forgot password
            </button>
            <br />
            <span id="password" className="ps-2 text-red-500"></span>
            </div>
            

            <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded-md font-medium hover:bg-green-800 transition"
            >
                Login
            </button>
            </form>

            {/* Footer */}
            <p className="text-xs text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-700 font-semibold">
                Register
            </Link>
            </p>
        </div>
        </div>
    );
};

export default SignIn;
