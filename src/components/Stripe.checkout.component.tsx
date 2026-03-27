import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "processing" | "error" | "pending"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setStatus("processing");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-status", //  better than success page directly
      },
    });

    //  Immediate error (card declined, validation, etc.)
    if (error) {
      setStatus("error");
      setLoading(false);

      toast.error(error.message || "Payment failed");
      console.error("Stripe Error:", error.message);

      return;
    }

    //  If no error → Stripe will redirect
    // This state is temporary before redirect happens
    setStatus("pending");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      {/*  STATUS MESSAGES */}
      {status === "processing" && (
        <p className="text-yellow-600"> Processing payment...</p>
      )}

      {status === "pending" && (
        <p className="text-blue-600"> Redirecting to payment page...</p>
      )}

      {status === "error" && (
        <p className="text-red-600"> Payment failed. Please try again.</p>
      )}

      {/*  BUTTON */}
      <button
        disabled={!stripe || loading}
        className={`px-4 py-2 rounded-xl text-white ${
          loading ? "bg-gray-400" : "bg-violet-600"
        }`}
        type="submit"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default Checkout;