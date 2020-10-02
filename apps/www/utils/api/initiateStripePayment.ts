import { fetcher } from '../fetcher';

export const initiateStripePayment = () => {
  return fetcher(`/orders/initiate-stripe-payment`, 'PATCH', {});
};
