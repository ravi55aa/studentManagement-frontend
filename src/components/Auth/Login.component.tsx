import InputField from '../inputField';
import { LoginType } from '@/types/loginType';
import { useNavigate } from 'react-router-dom';

export const Login = (props:LoginType) => {
    const navigate=useNavigate();

    return (
        <div>
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome, Log into your account</h1>

        <p className="text-gray-500 mb-8 text-sm">
            It is our great pleasure to have <br /> you on board!
        </p>

        {/* Error Message */}
        {props.error && <p className="text-red-600 text-sm mb-4">{props.error}</p>}

        {/* Form */}
        <form onSubmit={props.onSubmit} className="space-y-4">
            
            <InputField 
            type='text' 
            label='Enter Email' 
            name='email' 
            value={props.emailValue}
            onChange={onchange} 
            placeholder='Enter your email' />

            <InputField
                type="password"
                label='Enter Password'
                name="password"
                value={props.passwordValue}
                onChange={onchange}
                placeholder="Enter Password"
            />

            <button 
            onClick={()=>navigate("/passwordReset/emailVerify",{state:props.user})} 
            type="button" className="text-sm ps-2 text-end! w-[100]">
                forgot password
            </button>

            <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md font-medium hover:bg-green-800 transition"
            >
            Login
            </button>
        </form>
        </div>
    );
};

export default Login;
