import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInSchema } from '@/validation/register.schema';
import { handleValidationOF } from '@/validation/validateFormData';
import Login from '@/components/Auth/Login.component';
import { handleAdminSignIn } from '@/api/auth.api';
import { storeCurrentUser } from '@/utils/Redux/Reducer/currentUser.reducer';
import { useAppDispatch } from '@/hooks/useStoreHooks';
import { Roles } from '@/constants/role.enum';

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [form, setForm] = useState({
        email: '',
        password: '',
        userType: 'SuperAdmin',
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

        const res = await  handleAdminSignIn(form,'SuperAdmin');

        console.log('@SuperAdminLogin res', res);

        if (!res.success) {
            setError(res.error.message);
            return res.success;
        }

        const adminData=res.data?.data;
    
        const user = { id: adminData?._id, role: form.userType };
        dispatch(storeCurrentUser(user));
        
        navigate('/admin/dashboard');

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
            user={{role:'SuperAdmin'}}
            />
        </div>
        </div>
    );
};

export default SignIn;