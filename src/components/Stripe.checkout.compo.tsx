import {
    PaymentElement,
    useStripe,
    useElements,
    } from "@stripe/react-stripe-js";

    const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: "http://localhost:5173/payment-success",
        },
        });

        if (error) {
        console.error(`Stripe_Error:${ error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
            className="btn px-4 py-2 bg-violet-600 rounded-xl text-white mt-4"
            type="submit"
        >
            Pay
        </button>
        </form>
    );
};

export default Checkout;
