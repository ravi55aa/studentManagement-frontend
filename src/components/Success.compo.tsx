import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

//HARDCODE
const HARDCODE_WARNING='pk_test_51T1raIKmGGGaOlvzfcwVt30pI5XaOkaX2qherrCBUqYzmwhFcNU7w6SfT8EVxd5XNAlHo2zkP92mJcl2YCMTGaNn00Z6HxrVVf';
const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLISHABLE_KEY ??HARDCODE_WARNING);

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

    useEffect(() => {
        const verifyPayment = async () => {
            const clientSecret = searchParams.get(
            "payment_intent_client_secret"
            );

            if (!clientSecret) {
            setStatus("failed");
            return;
            }

            const stripe = await stripePromise;
            if (!stripe) {
            setStatus("failed");
            return;
            }

            const { paymentIntent } =
            await stripe.retrievePaymentIntent(clientSecret);

            if (paymentIntent?.status === "succeeded") {
            setStatus("success");
            } else {
            setStatus("failed");
            }
        };

        verifyPayment();
    }, [searchParams]);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-green-600 to-green-700 px-4">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 text-center animate-fade-in">
            
            {status === "loading" && (
            <>
                <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <h2 className="text-xl font-semibold text-gray-700">
                Verifying Payment...
                </h2>
            </>
            )}

            {status === "success" && (
            <>
                <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                    />
                </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Payment Successful
                </h1>
                <p className="text-gray-500 mb-6">
                Your transaction has been completed successfully.
                </p>

                <button
                onClick={() => navigate("/")}
                className="w-full bg-green-600 hover:bg-green-700 transition-all text-white font-semibold py-3 rounded-xl shadow-lg"
                >
                Go to Dashboard
                </button>
            </>
            )}

            {status === "failed" && (
            <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                    className="w-10 h-10 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Payment Failed
                </h1>
                <p className="text-gray-500 mb-6">
                Something went wrong. Please try again.
                </p>

                <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-red-500 hover:bg-red-600 transition-all text-white font-semibold py-3 rounded-xl shadow-lg"
                >
                Try Again
                </button>
            </>
            )}
        </div>
        </div>
    );
};

export default PaymentSuccess;
