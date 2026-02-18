import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Stripe.checkout.compo";
//import { toast } from "react-toastify";

const pk_strip="pk_test_51T1raIKmGGGaOlvzfcwVt30pI5XaOkaX2qherrCBUqYzmwhFcNU7w6SfT8EVxd5XNAlHo2zkP92mJcl2YCMTGaNn00Z6HxrVVf";
//import.meta.env.STRIPE_PUBLISHABLE_KEY

const stripePromise = loadStripe(pk_strip);

// if(!import.meta.env.STRIPE_PUBLISHABLE_KEY){
//     toast.warn("There is no STRIPE PUBLISHABLE KEY");
// }

const CheckoutPage = () => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        const createPaymentIntent = async () => {
            const response = await fetch(
                "http://localhost:4000/stripe/create-payment-intent",
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 1000 }),
                }
            );

            const data = await response.json();
            setClientSecret(data.clientSecret);
        };

        createPaymentIntent();
    }, []);

    if (!clientSecret) return <div>Loading payment...</div>;

    return (
        <Elements
        stripe={stripePromise}
        options={{ clientSecret }} // REQUIRED
        >
        <Checkout />
        </Elements>
    );
};

export default CheckoutPage;

/**
    issues in stripe
    ---------------
    
    1.Show multiple payment options
    2.not asking the amount,
    
    3.why webhook
    4.webhook secret key

    5.Model design for payment(one_time and subscription)

 */
