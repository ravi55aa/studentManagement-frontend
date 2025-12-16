
const SocialLogin = () => {

    return (
        <div className='w-full max-w-md text-center px-4 flex flex-col'>
            {/* Social Buttons */}
            <button 
            type="button"
            onClick={()=>
            window.location.href= "http://localhost:4000/google/auth"
            }
            className="border border-gray-300 rounded-md py-2 text-sm flex justify-center items-center gap-2 hover:bg-gray-50">
            <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-4 h-4"
            />
            Continue with Google
            </button>

            <button className="border border-gray-300 rounded-md py-2 text-sm flex justify-center items-center gap-2 hover:bg-gray-50">
            <img
                src="https://www.svgrepo.com/show/349540/facebook.svg"
                className="w-4 h-4"
            />
            Continue with Facebook
            </button>
        </div>
    ) 
}

export default SocialLogin

