import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
// import useHR from '../../Hooks/useHR';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ userData, usd, refetch }) => {
  const [err, setErr] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const axios = useAxios();
  const members = Number(userData?.package?.split(' ')[0]);
  const [isPaymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    axios.post('/create-payment-intent', { price: usd }).then((res) => {
      // console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axios, usd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      // console.log(error);
      setErr(error.message);
      return;
    } else {
      // console.log('paymentMethod', paymentMethod);
      setErr('');
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userData?.name || 'anonymous',
            email: userData?.email || 'anonymous',
          },
        },
      });

    if (confirmError) {
      // console.log(confirmError);
      setErr('');
    } else {
      // console.log('intent', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        const payment = {
          email: userData?.email,
          price: usd,
          date: new Date(),
          package: userData?.package,
          transactionId: paymentIntent.id,
        };

        const res = await axios.post('/payments', {
          payment,
          id: userData._id,
          members,
        });
        // console.log(res.data.updateHR.modifiedCount);
        if (res.data.updateHR.modifiedCount) {
          toast.success('Success');
          refetch();
          navigate('/');
        }
      }
    }
  };

  return (
    <div
      className="bg-stone-700 w-[600px] mx-auto "
      style={{
        padding: '3rem',
      }}
    >
      <h4 className=" text-stone-100 text-2xl font-semibold  uppercase">
        Pay : ${usd ? usd : 0}
      </h4>
      <p className=" mb-10 text-white text-xl font-semibold">
        Package : {userData?.package}
      </p>
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'block',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: 'white',
                  },
                },
              }}
            />
            <button
              className="pay-button"
              type="submit"
              disabled={!stripe || !clientSecret}
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
