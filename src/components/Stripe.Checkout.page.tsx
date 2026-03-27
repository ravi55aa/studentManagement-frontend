import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Stripe.checkout.component';
import { useLocation } from 'react-router-dom';
import { StudentFeeService } from '@/api/Services/Student/studentFee.service';
import { Roles } from '@/constants/role.enum';
import { toast } from 'react-toastify';
import { StripeRouter } from '@/constants/routes.contants';
import { useAppNavigate } from '@/hooks/useNavigate.hook';
//import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// if(!import.meta.env.STRIPE_PUBLISHABLE_KEY){
//     toast.warn("There is no STRIPE PUBLISHABLE KEY");
// }

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const {state}=useLocation();
  const {goStudentFee}=useAppNavigate();

  useEffect(() => {
    const createPaymentIntent = async () => {
      const {userId,studentFeeId,amount,role}=state;

      try{
        const response=await fetch(`http://localhost:4000${StripeRouter.pay}`, { 
          method:'post',
          body:JSON.stringify(
            { 'amount':amount,
              'studentFeeId':studentFeeId,
              'userId':userId
            }),
          headers:{
            role:role,
            'content-type':'application/json',
          }
        })
  
        const data=await response.json();
        
        if(!data?.clientSecret){
          toast.warn('Cant reach the Client_secret');
          goStudentFee();
          return false;
        }

        setClientSecret(data?.clientSecret);
      
      } catch(err){
        toast.error(err.message);
        return false; 
      }
    };

    createPaymentIntent();
  }, [state]);

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
