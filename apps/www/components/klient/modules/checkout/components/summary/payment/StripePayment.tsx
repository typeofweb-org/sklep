import { CardElement, useStripe } from '@stripe/react-stripe-js';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import React, { useEffect } from 'react';

import { useCheckoutDispatch, useCheckoutState } from '../../../utils/checkoutContext';

export const CheckoutForm = React.memo(() => {
  const stripe = useStripe();

  const state = useCheckoutState();
  const dispatch = useCheckoutDispatch();
  console.log(state.processing);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // window
    //   .fetch('/create-payment-intent', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    //   })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setClientSecret(data.clientSecret);
    //   });
  }, []);
  const cardStyle = {
    placeholder: 'Dupa',
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  const handleChange = (event: StripeCardElementChangeEvent) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    dispatch({ type: 'DISABLE', payload: event.empty });
    dispatch({ type: 'ERROR', payload: event.error ? event.error.message : '' });
    // setError(event.error ? event.error.message : '');
  };
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    console.log(ev);
    ev.preventDefault();
    if (!stripe) {
      return;
    }

    dispatch({ type: 'PROCESS', payload: true });
    // setProcessing(true);
    // console.log(stripe);
    // const payload = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //   },
    // });
    // if (payload.error) {
    //   setError(`Payment failed ${payload.error.message}`);
    //   setProcessing(false);
    // } else {
    //   setError('');
    //   setProcessing(false);
    //   setSucceeded(true);
    // }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button disabled={state.processing || state.disabled || state.succeeded} id="submit">
        <span id="button-text">
          {state.processing ? <div className="spinner" id="spinner"></div> : 'Zapłać'}
        </span>
      </button>
      {/* <Button type="submit" disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : 'Zapłać'}
        </span>
      </Button> */}
      {/* Show any error that happens when processing the payment */}
      {/* {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={state.succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}> Stripe dashboard.</a> Refresh the
        page to pay again.
      </p>
    </form>
  );
});

CheckoutForm.displayName = 'CheckoutForm';
