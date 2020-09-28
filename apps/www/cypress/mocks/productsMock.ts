/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export const getShopProducts = (response) => {
  cy.route2('http://api.sklep.localhost:3002/products', response).as('getShopProducts');
};
