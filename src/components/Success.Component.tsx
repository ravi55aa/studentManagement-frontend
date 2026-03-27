import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useAppNavigate } from "@/hooks/useNavigate.hook";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!
);

type Status =
  | "loading"
  | "success"
  | "failed"
  | "processing"
  | "requires_payment_method"
  | "unknown";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {goStudentFee} = useAppNavigate();

  const [status, setStatus] = useState<Status>("loading");
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const clientSecret = searchParams.get(
        "payment_intent_client_secret"
      );

      if (!clientSecret) {
        setStatus("unknown");
        return;
      }

      const stripe = await stripePromise;
      if (!stripe) {
        setStatus("unknown");
        return;
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      console.log('@success.component paymentIntent',paymentIntent);

      if (!paymentIntent) {
        setStatus("unknown");
        return;
      }

      setPaymentId(paymentIntent.id);

      switch (paymentIntent.status) {
        case "succeeded":
          setStatus("success");
          break;

        case "processing":
          setStatus("processing");
          break;

        case "requires_payment_method":
          setStatus("requires_payment_method");
          break;

        case "canceled":
          setStatus("failed");
          break;

        default:
          setStatus("unknown");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-green-600 to-green-700 px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 text-center animate-fade-in">

        {/*  LOADING */}
        {status === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-gray-700">
              Verifying Payment...
            </h2>
          </>
        )}

        {/*  SUCCESS */}
        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful
            </h1>
            <p className="text-gray-500 mb-2">
              Your transaction was completed.
            </p>

            {paymentId && (
              <p className="text-sm text-gray-400 mb-6">
                Payment ID: {paymentId}
              </p>
            )}

            <button
              onClick={goStudentFee}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
            >
              Go to Dashboard
            </button>
          </>
        )}

        {/*  PROCESSING */}
        {status === "processing" && (
          <>
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              Loading...
            </div>

            <h1 className="text-xl font-bold text-gray-800 mb-2">
              Payment Processing
            </h1>
            <p className="text-gray-500 mb-6">
              Your payment is still being processed. Please wait or refresh later.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl"
            >
              Refresh Status
            </button>
          </>
        )}

        {/*  RETRY (requires_payment_method) */}
        {status === "requires_payment_method" && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              No
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Failed
            </h1>
            <p className="text-gray-500 mb-6">
              Your payment was not completed. Try again.
            </p>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
            >
              Retry Payment
            </button>
          </>
        )}

        {/* FAILED */}
        {status === "failed" && (
          <>
            <h1 className="text-xl text-red-600 font-bold">
              Payment Failed
            </h1>
          </>
        )}

        {/*  UNKNOWN */}
        {status === "unknown" && (
          <>
            <h1 className="text-xl text-gray-600 font-bold">
              Something went wrong
            </h1>
            <button
              onClick={goStudentFee}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
            >
              Go Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;