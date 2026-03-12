import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInSchema } from '@/validation/register.schema';
import { handleValidationOF } from '@/validation/validateFormData';
import Login from '@/components/Auth/Login.component';
import { TeacherService } from '@/api/Services/teacher.service';
import { LoginPayloadType } from '@/types/loginType';
import { Roles } from '@/constants/role.enum';

const SignIn = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<LoginPayloadType>({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        document.getElementById(e.target.name).textContent = '';
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formIsValidated = handleValidationOF(signInSchema, form);
        if (!formIsValidated) {
        return false;
        }

        setError('');

        const res = await TeacherService.login(form);
        
        if (!res.success) {
            setError(res.error?.message);
        }
        
        navigate('/teacher/dashboard');
        const user=JSON.stringify(res.data?.data||{});
        localStorage.setItem('sectionB',user);

        return res.success;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center w-full max-w-md">
            <Login 
            onSubmit={handleSubmit} 
            onchange={handleInputChange} 
            emailValue={form.email} 
            passwordValue={form.password}
            error={error}
            key='teacherLogin'
            user={{role:Roles.Teacher}}
            />
    
        </div>
        </div>
    );
};

export default SignIn;
