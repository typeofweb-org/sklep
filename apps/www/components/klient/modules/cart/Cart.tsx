import React from 'react';

import { useCart } from '../../shared/utils/useCart';

import { CartList } from './components/list/CartList';
import { CartSummary } from './components/summary/CartSummary';

export const Cart = () => {
  const { isLoading, cartResponseData } = useCart();

  return (
    <section className="bg-white worksans py-8">
      {!isLoading && cartResponseData && (
        <div className="container mx-auto flex flex-col md:flex-row px-2 pt-4 pb-12">
          <CartList cart={cartResponseData} />
          <CartSummary cart={cartResponseData} />
        </div>
      )}
    </section>
  );
};
