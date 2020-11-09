type CartFromDB = {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly cartProducts: readonly {
    readonly quantity: number;
    readonly product: {
      readonly id: number;
      readonly name: string;
      readonly slug: string;
      readonly regularPrice: number;
      readonly discountPrice?: number | null;
    };
  }[];
};

export function calculateCartTotals(cart: CartFromDB) {
  return cart.cartProducts.reduce(
    (acc, cartProduct) => {
      const regularSum = cartProduct.product.regularPrice * cartProduct.quantity;
      const discountSum =
        (cartProduct.product.discountPrice ?? cartProduct.product.regularPrice) *
        cartProduct.quantity;

      acc.regularSubTotal += Math.round(regularSum);
      acc.discountSubTotal += Math.round(discountSum);
      acc.totalQuantity += cartProduct.quantity;
      return acc;
    },
    {
      regularSubTotal: 0,
      discountSubTotal: 0,
      totalQuantity: 0,
    },
  );
}
