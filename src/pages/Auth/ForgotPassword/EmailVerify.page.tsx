import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { handleValidationOF } from '@/validation/validateFormData';
import { emailVerificationSchema } from '@/validation/otpReset';
import { AuthService } from '@/api/Services/user.service';
import { IResponse } from '@/interfaces/IResponse';
import { TeacherService } from '@/api/Services/teacher.service';
import { toast } from 'react-toastify';

const ForgotPasswordEmailVerify = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const user=location.state; 

  const [socketCall,setSocketCall]=useState('');
  const [form, setForm] = useState({
    email: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.getElementById(e.target.name)!.textContent = '';
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = handleValidationOF(emailVerificationSchema, form);

    if (!isValidated.success) return;

    setError('');

    let res:{ success: boolean; 
              data?: IResponse<{id:string}>; 
              error?: { 
                message?: string; 
                field?: string; 
                code?: number; 
              }; 
            };

    if(user.role == 'teacher'){
      res=await handleTeacherVerifyEmail();
    } else {
      res=await handleAdminVerifyEmail();
    }

    if (!res.success) {
      toast.warn('Email Verification Failed');
      setError(res.error.message);
      return res.success;
    }

    const data=res.data?.data;
    
    localStorage.setItem('idToResetPassword', JSON.stringify(data.id));

    navigate('/passwordReset/otp',{state:location.state});
    return;

  };

  async function handleAdminVerifyEmail(){
    return await AuthService.verifyEmail(form.email,user.role);
  }

  async function handleTeacherVerifyEmail(){
    return await TeacherService.verifyTeacher(form.email);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center w-full max-w-md">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Change password</h1>

        <p className="text-gray-500 mb-8 text-sm">
          Enter your Working Email to <br /> get password
        </p>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-start">
            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700"
            />
            <span id="email" className="ps-2 text-red-500"></span>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md font-medium hover:bg-green-800 transition"
          >
            Verify Email
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6">
          Remember your password?{' '}
          <Link to="/login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordEmailVerify;
