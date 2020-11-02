export const formatCurrency = (price: number) =>
  new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(price);
