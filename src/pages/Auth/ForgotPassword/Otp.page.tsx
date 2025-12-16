// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { handleValidationOF } from "@/validation/validateFormData";
// import { otpVerificationSchema } from "@/validation/register.schema";
// import { handleVerifyOtp } from "@/api/auth.api";

// const OtpVerification = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     otp: "",
//   });

//   const [error, setError] = useState("");

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     document.getElementById(e.target.name)!.textContent = "";
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const isValidated = handleValidationOF(
//       otpVerificationSchema,
//       form
//     );

//     if (!isValidated.success) return;

//     setError("");

//     const res = await handleVerifyOtp(form);

//     if (res.success) {
//       navigate("/reset-password");
//       return;
//     }

//     setError(res.error.message);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="text-center w-full max-w-md">

//         {/* Heading */}
//         <h1 className="text-3xl font-semibold text-gray-800 mb-2">
//           OTP Verification
//         </h1>

//         <p className="text-gray-500 mb-8 text-sm">
//           Enter the OTP sent to your <br /> registered email address
//         </p>

//         {/* Error Message */}
//         {error && (
//           <p className="text-red-600 text-sm mb-4">{error}</p>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">

//           <div className="text-start">
//             <input
//               type="text"
//               name="otp"
//               placeholder="Enter 6-digit OTP"
//               value={form.otp}
//               onChange={handleInputChange}
//               maxLength={6}
//               className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none tracking-widest text-center focus:ring-2 focus:ring-green-700"
//             />
//             <span id="otp" className="ps-2 text-red-500"></span>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-700 text-white py-2 rounded-md font-medium hover:bg-green-800 transition"
//           >
//             Verify OTP
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-xs text-gray-500 mt-6">
//           Didn’t receive OTP?{" "}
//           <Link to="/forgot-password" className="text-green-700 font-semibold">
//             Resend
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default OtpVerification;
import React from 'react'

const OTP = () => {
  return (
    <div>OTP</div>
  )
}

export default OTP