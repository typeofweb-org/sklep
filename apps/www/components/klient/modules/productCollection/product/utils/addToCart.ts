export const addToCart = (productId: string): Promise<void> => {
  return fetch('/add-to-cart', { method: 'POST', body: productId }).then((res) => {
    if (!res.ok) {
      throw new Error('Add to cart error');
    }

    return res.json();
  });
};
