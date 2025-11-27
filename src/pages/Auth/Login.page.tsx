import { SocialLogin,FormBody } from "@/components/Auth";



const Login = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="w-full max-w-md text-center px-4">
            
            {/* Heading */}
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Welcome!
            </h1>
            <p className="text-gray-500 mb-8">
            This is a 
            <span className="text-green-700 cursor-pointer"> Virtual </ span>           
            world. Everything here is  
            <span className="text-green-700 cursor-pointer"> Virtual</span>            
            </p>

            {/* Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <FormBody/>
            {/* Divider */}
            <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-[1px] bg-gray-300" />
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-1 h-[1px] bg-gray-300" />
            </div>
            <SocialLogin/>
            {/* Footer */}
            <p className="text-xs text-gray-500 mt-6">
                Have an account?{" "}
                <span className="text-green-700 cursor-pointer">Sign In</span>
            </p>
            </div>
        </div>
        </div>
    );
};

export default Login;
