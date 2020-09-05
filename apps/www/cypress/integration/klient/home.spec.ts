describe('Display Home Page', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('/');
  });

  // it('test', () => {
  //   cy.findByText('Strona główna').should('exist');
  // });
});
