import React, { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleValidationOF } from "@/validation/validateFormData";
import { otpVerificationSchema } from "@/validation/otpReset";
import { HandleApiOptions,handleApi } from "@/api/global.api";
import { forgotPassword } from "@/constants/routes.contants";


export interface IOtp extends Document {
    _id: string;
    otp: string;
    expiresAt: Date;
    createdAt: Date;
}

const OtpVerification = () => {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(300); 

  const [form, setForm] = useState({
    otp: "",
  });

  const [error, setError] = useState("");


//calling generateOtp()
//as soon page renders
  useEffect(() => {
    const generateOtp = async () => {
      try {
        const id=JSON.parse(localStorage.getItem("idToResetPassword"));

        if(!id){
          throw new Error("Reset Password, 'id' not find");
        }

        const config:HandleApiOptions<null>={
                    method:"get",
                    endPoint:`${forgotPassword.generateOtp}/${id}`,
                    headers:{role:"admin"}
                }
        
        const res = await handleApi<null,IOtp>(config);
        const otp=res.data.data.otp;
        localStorage.setItem("generatedOtp",JSON.stringify(otp));
        return true;

      } catch (error) {
        console.error("OTP generation failed:", error);
      }
    };

    generateOtp();
  }, []);


  useEffect(() => {
  if (timeLeft <= 0) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.getElementById(e.target.name)!.textContent = "";
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidated = handleValidationOF(
      otpVerificationSchema,
      form
    );

    if (!isValidated.success) return;

    setError("");

    const id=JSON.parse(localStorage.getItem("idToResetPassword"));

    const otp=JSON.parse(localStorage.getItem("generatedOtp"));
    
      const config:HandleApiOptions<object>={
                    method:"post",
                    endPoint:`${forgotPassword.verifyOtp}/${id}`,
                    payload:{generatedOtp:otp,userEnteredOtp:form.otp},
                    headers:{role:"admin"}
                }
        
      const res = await handleApi(config);

    if (res.success) {
      navigate("/passwordReset");
      return;
    }

    setError("Password reset error, try again");
    return false;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center w-full max-w-md">

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          OTP Verification
        </h1>

        <p className="text-gray-500 mb-8 text-sm">
          Enter the OTP sent to your <br /> registered email address
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}
        {timeLeft <= 0 && (
          <p className="text-red-600 text-sm mb-4">
            OTP has expired. Please resend OTP.
          </p>
        )}


        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="text-start">
            <input
              type="text"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={form.otp}
              onChange={handleInputChange}
              maxLength={6}
              className="w-full border border-gray-300 rounded-md px-4 py-2 
              text-sm outline-none tracking-widest text-center 
              focus:ring-2 focus:ring-green-700"
            />
            <span id="otp" className="ps-2 text-red-500"></span>
          </div>

          <p className="text-sm text-gray-600 mb-4">
        OTP expires in{" "}
        <span className="font-semibold text-red-600">
          {formatTime(timeLeft)}
        </span>
      </p>

          <button
        type="submit"
        disabled={timeLeft <= 0}
        className={`w-full py-2 rounded-md font-medium transition 
          ${timeLeft <= 0 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-green-700 hover:bg-green-800 text-white"
          }`}
      >
        Verify OTP
      </button>
        </form>
              


        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6">
          Didn’t receive OTP?{" "}
          <Link to="/forgot-password" className="text-green-700 font-semibold">
            Resend
          </Link>
        </p>

      </div>
    </div>
  );
};

export default OtpVerification;
