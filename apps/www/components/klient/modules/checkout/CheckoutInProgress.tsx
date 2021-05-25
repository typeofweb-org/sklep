import type { SklepTypes } from '@sklep/types';
import ms from 'ms';
import { useRouter } from 'next/router';
import React from 'react';

import { useGetOrderById } from '../../../../utils/api/queryHooks';
import { formatCurrency } from '../../../../utils/currency';
import { ResponseError } from '../../../../utils/fetcher';
import { Price } from '../../shared/components/price/Price';
import { CartItemImage } from '../../shared/image/CartItemImage';

type CheckoutInProgressProps = {
  readonly orderId: string;
};

const ORDER_FINISHED_STATUSES = ['COMPLETED', 'CANCELLED', 'REFUNDED', 'FAILED'];
const POLL_INTERVAL = ms('3 seconds');

export const CheckoutInProgress = React.memo<CheckoutInProgressProps>(({ orderId }) => {
  const router = useRouter();
  const [isFinished, setIsFinished] = React.useState(false);

  const {
    data: latestOrderResponse,
    isLoading,
    error,
  } = useGetOrderById(orderId, {
    // long polling until the order is paid
    refetchInterval: !isFinished ? POLL_INTERVAL : undefined,
    refetchIntervalInBackground: !isFinished,
  });
  const cart = latestOrderResponse?.data.cart as
    | SklepTypes['postCart200Response']['data']
    | undefined;

  React.useEffect(() => {
    if (error instanceof ResponseError) {
      if (error.status === 404) {
        void router.replace('/');
      }
    }
  }, [error, router]);

  React.useEffect(() => {
    if (
      latestOrderResponse?.data.status &&
      ORDER_FINISHED_STATUSES.includes(latestOrderResponse.data.status)
    ) {
      setIsFinished(true);
    }
  }, [latestOrderResponse?.data.status]);

  if (isLoading || !cart || error) {
    return null;
  }

  // @todo: Ten kod jest bardzo zduplikowany z koszykiem
  return (
    <section className="container mx-auto flex flex-col md:flex-row justify-center px-2 pb-12 worksans py-8">
      <div className="w-full md:w-1/2 mb-4">
        {!isFinished && <h2 className="text-3xl mb-6">Oczekujemy na potwierdzenie płatności…</h2>}
        <h3 className="text-2xl mb-6">Twoje zamówienie</h3>
        <table className="table-fixed mb-6">
          <tbody>
            {cart.cartProducts.map((cartProduct) => {
              const { quantity, product } = cartProduct;
              return (
                <tr key={product.id}>
                  <td className="w-20 h-24 py-2">
                    <CartItemImage />
                  </td>
                  <td className="px-2 w-2/6 sm:w-1/2">
                    <p>{product.name}</p>
                  </td>
                  <td className="px-2">x{quantity}</td>
                  <td className="pr-4 text-right w-20">
                    <Price
                      regularPrice={product.regularPrice}
                      discountPrice={product.discountPrice}
                      direction="column"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <div className="border border-gray-400 bg-gray-100">
            <div className="flex justify-between border-b border-gray-400 w-full p-4">
              <span>Kwota</span>
              <Price regularPrice={cart.regularSubTotal} discountPrice={cart.discountSubTotal} />
            </div>
            <div className="flex justify-between w-full p-4 text-2xl">
              <span>Do zapłaty</span>
              {/* @todo add shipping cost */}
              <span>{formatCurrency(cart.discountSubTotal / 100)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
CheckoutInProgress.displayName = 'CheckoutInProgress';
