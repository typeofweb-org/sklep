import * as Faker from 'faker';

import { calculateCartTotals } from './index';

describe('calculations', () => {
  describe('calculateCartTotals', () => {
    it('should calculate subtotals', () => {
      type CartArg = Parameters<typeof calculateCartTotals>[0];
      const cart: CartArg = {
        id: Faker.datatype.uuid(),
        createdAt: Faker.date.past(),
        updatedAt: Faker.date.past(),
        cartProducts: [
          {
            quantity: 1,
            product: {
              id: Faker.datatype.number({ min: 0, precision: 0 }),
              name: Faker.commerce.productName(),
              slug: Faker.internet.userName(),
              regularPrice: 123_00,
              discountPrice: 100_00,
            },
          },
          {
            quantity: 1,
            product: {
              id: Faker.datatype.number({ min: 0, precision: 0 }),
              name: Faker.commerce.productName(),
              slug: Faker.internet.userName(),
              regularPrice: 15_23,
              discountPrice: null,
            },
          },
          {
            quantity: 3,
            product: {
              id: Faker.datatype.number({ min: 0, precision: 0 }),
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

    it('rounds correctly', () => {
      type CartArg = Parameters<typeof calculateCartTotals>[0];
      const cart: CartArg = {
        id: Faker.datatype.uuid(),
        createdAt: Faker.date.past(),
        updatedAt: Faker.date.past(),
        cartProducts: [
          {
            quantity: 1.05,
            product: {
              id: Faker.datatype.number({ min: 0, precision: 0 }),
              name: Faker.commerce.productName(),
              slug: Faker.internet.userName(),
              regularPrice: 5713,
            },
          },
        ],
      };

      expect(calculateCartTotals(cart)).toEqual({
        regularSubTotal: 5999,
        discountSubTotal: 5999,
        totalQuantity: 1.05,
      });
    });
  });
});
