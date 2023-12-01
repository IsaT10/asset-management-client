import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import useHR from '../../Hooks/useHR';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  const { userData, refetch } = useHR();
  const usd = Number(userData?.package?.split(' ')[3]?.replace(/\$/, ''));
  return (
    <div>
      <h1>{usd ? usd : ''}</h1>

      <Elements stripe={stripePromise}>
        <CheckoutForm userData={userData} usd={usd} refetch={refetch} />
      </Elements>
    </div>
  );
};

export default Payment;
