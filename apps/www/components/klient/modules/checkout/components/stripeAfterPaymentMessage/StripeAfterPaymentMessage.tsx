import React from 'react';

interface StripeAfterPaymentMessageProps {
  readonly payloadError?: string;
}

export const StripeAfterPaymentMessage = React.memo<StripeAfterPaymentMessageProps>(
  ({ payloadError }) => {
    return (
      <>
        {payloadError ? (
          <p className="w-screen text-center text-red-600 text-4xl">{payloadError}</p>
        ) : (
          <p className="w-screen text-center text-green-600 text-4xl">Udało się</p>
        )}
      </>
    );
  },
);

StripeAfterPaymentMessage.displayName = 'StripeAfterPaymentMessage';
