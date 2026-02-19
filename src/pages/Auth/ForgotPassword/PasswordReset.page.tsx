import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleApiOptions, handleApi } from "@/api/global.api";
import { forgotPassword } from "@/constants/routes.contants";

const ResetPassword = () => {
    const navigate = useNavigate();

    /* ---------------- STATE ---------------- */
    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    /* ---------------- ON CHANGE VALIDATION ---------------- */
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));

        if (
        name === "confirmPassword" &&
        form.newPassword &&
        value !== form.newPassword
        ) {
        setError("Passwords do not match");
        } else {
        setError("");
        }
    };

    /* ---------------- SUBMIT HANDLER ---------------- */
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!form.newPassword || !form.confirmPassword) {
        setError("Both fields are required");
        return;
        }

        if (form.newPassword !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
        }

        try {
        setLoading(true);
        setError("");

        const id = JSON.parse(
            localStorage.getItem("idToResetPassword")!
        );

        const config: HandleApiOptions<object> = {
            method: "patch",
            endPoint: `${forgotPassword.updatePassword}/${id}`,
            payload: { newPassword: form.newPassword,modelName:"admin" },
            headers: { role: "admin" },
        };

        const res = await handleApi(config);

        if (res.success) {
            localStorage.removeItem("idToResetPassword");
            localStorage.removeItem("generatedOtp");
            navigate("/login");
            return;
        }

        setError(res.error || "Password update failed");
        } catch (err) {
            console.log(err,{cause:err.message});
            setError("Something went wrong");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md text-center">

            {/* Heading */}
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Reset Password
            </h1>

            <p className="text-gray-500 mb-8 text-sm">
            Enter and confirm your new password
            </p>

            {/* Error */}
            {error && (
            <p className="text-red-600 text-sm mb-4">
                {error}
            </p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

            <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={form.newPassword}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700"
            />

            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={form.confirmPassword}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-700"
            />

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md font-medium transition
                ${
                    loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-700 text-white hover:bg-green-800"
                }`}
            >
                {loading ? "Updating..." : "Update Password"}
            </button>

            </form>

        </div>
        </div>
    );
};

export default ResetPassword;



