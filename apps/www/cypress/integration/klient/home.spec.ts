/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

describe('Home Page', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('http://www.sklep.localhost:3000');
  });

  it('should properly render home page', () => {
    cy.get('title').should('contain.text', 'Sklep strona główna');
  });
});
