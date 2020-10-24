import type { SklepTypes } from '@sklep/types';
import React, { useCallback } from 'react';
import { Form as FinalForm } from 'react-final-form';
import * as Yup from 'yup';

import { Price } from '../../../shared/components/price/Price';
import { useCart } from '../../../shared/utils/useCart';
import { createFormValidator } from '../../../utils/formUtils';
import { AddToCartButton } from '../../productCollection/components/product/components/addToCartButton/AddToCartButton';
import { Amount } from '../amount/Amount';

const quantitySchema = Yup.object({
  quantity: Yup.number()
    .typeError('Podaj poprawną wartość')
    .min(1, 'Podaj min. 1')
    .required('To pole jest wymagane'),
}).required();

type ContentProps = {
  readonly product: SklepTypes['getProducts200Response']['data'][number];
};

type FormData = {
  readonly quantity: number;
};

export const ProductInfo = React.memo<ContentProps>(({ product }) => {
  const { addToCartByQuantity } = useCart();
  const validate = React.useMemo(() => createFormValidator(quantitySchema), []);

  const handleSubmit = useCallback(
    async ({ quantity }: FormData) => {
      await addToCartByQuantity({ productId: product.id, quantity });
    },
    [addToCartByQuantity, product.id],
  );

  return (
    <div className="w-full md:w-5/12">
      <h1 className="text-2xl mb-2">{product.name}</h1>
      <Price regularPrice={product.regularPrice} discountPrice={product.discountPrice} />
      <p className="text-base text-gray-600 leading-6 mt-2">{product.description}</p>
      <div className="w-full md:w-2/3">
        <FinalForm
          initialValues={{ quantity: 1 }}
          validate={validate}
          onSubmit={handleSubmit}
          mutators={{
            decrement: (_args, state, utils) => {
              utils.changeValue(state, 'quantity', (value) => Number(value) - 1);
            },
            increment: (_args, state, utils) => {
              utils.changeValue(state, 'quantity', (value) => Number(value) + 1 || 1);
            },
          }}
        >
          {({ handleSubmit, form }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Amount
                  increaseAmount={form.mutators.increment}
                  decreaseAmount={form.mutators.decrement}
                />
                <AddToCartButton buttonType="submit" />
              </form>
            );
          }}
        </FinalForm>
      </div>
    </div>
  );
});

ProductInfo.displayName = 'Amount';
