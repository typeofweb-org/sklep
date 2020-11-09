import { calculateCartTotals } from './index';
import * as Faker from 'faker';

describe('calculations', () => {
  describe('calculateCartTotals', () => {
    it('should calculate subtotals', () => {
      type CartArg = Parameters<typeof calculateCartTotals>[0];
      const cart: CartArg = {
        id: Faker.random.uuid(),
        createdAt: Faker.date.past(),
        updatedAt: Faker.date.past(),
        cartProducts: [
          {
            quantity: 1,
            product: {
              id: Faker.random.number({ min: 0, precision: 0 }),
              name: Faker.commerce.productName(),
              slug: Faker.internet.userName(),
              regularPrice: 123_00,
              discountPrice: 100_00,
            },
          },
          {
            quantity: 1,
            product: {
              id: Faker.random.number({ min: 0, precision: 0 }),
              name: Faker.commerce.productName(),
              slug: Faker.internet.userName(),
              regularPrice: 15_23,
              discountPrice: null,
            },
          },
          {
            quantity: 3,
            product: {
              id: Faker.random.number({ min: 0, precision: 0 }),
              name: Faker.commerce.productName(),
              slug: Faker.internet.userName(),
              regularPrice: 89_99,
              discountPrice: 59_99,
            },
          },
        ],
      };

      expect(calculateCartTotals(cart)).toEqual({
        regularSubTotal: 408_20,
        discountSubTotal: 295_20,
        totalQuantity: 5,
      });
    });
  });
});
