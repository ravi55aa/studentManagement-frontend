import React, { useState } from 'react';
import { handleAdminSignIn } from '@/api/auth.api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router';
import { signInSchema } from '@/validation/register.schema';
import { handleValidationOF } from '@/validation/validateFormData';
import Login from '@/components/Auth/Login.component';

const SignIn = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
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

        const res = await handleAdminSignIn(form);

        if (res.success) {
        navigate('/school/login');
        }

        setError(res.error.message);
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
            key='superAdminLogin'
            user={{role:'Admin'}}
            />
        </div>
        </div>
    );
};

export default SignIn;