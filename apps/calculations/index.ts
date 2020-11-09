type CartFromDB = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  cartProducts: {
    quantity: number;
    product: {
      id: number;
      name: string;
      slug: string;
      regularPrice: number;
      discountPrice: number | null;
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

      acc.regularSubTotal += Math.trunc(regularSum);
      acc.discountSubTotal += Math.trunc(discountSum);
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
