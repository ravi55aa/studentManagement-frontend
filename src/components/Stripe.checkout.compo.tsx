import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

    const createPaymentIntent = async () => {
        const response = await fetch("http://localhost:4000/api/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000 }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: "http://localhost:5173/success",
        },
        });

        if (result.error) {
        console.log(result.error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <button type="button" onClick={createPaymentIntent}>
            Initialize Payment
        </button>

        {clientSecret && <PaymentElement />}

        <button type="submit">Pay</button>
        </form>
    );
};

export default Checkout;
