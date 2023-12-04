import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm';
import useHR from '../../../Hooks/useHR';
import './Payment.css';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  const navigate = useNavigate();

  const { userData, refetch } = useHR();

  if (userData?.role !== 'HR') navigate('/');
  const usd = Number(userData?.package?.split(' ')[3]?.replace(/\$/, ''));
  return (
    <div className="h-[calc(100vh-85px)] flex flex-col gap-5 justify-center">
      <Elements stripe={stripePromise}>
        <CheckoutForm userData={userData} usd={usd} refetch={refetch} />
      </Elements>
    </div>
  );
};

export default Payment;
