/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as productsMock from '../../mocks/productsMock';

describe('Home Page', () => {
  beforeEach(() => {
    cy.server();
    cy.fixture('products_mock_data.json').then((rc) => {
      productsMock.getShopProducts(rc.mockedProducts);
    });
    cy.visit('http://www.sklep.localhost:3000');
    cy.wait('@getShopProducts');
  });

  it('should properly render home page', () => {
    cy.get('title').should('contain.text', 'Sklep strona główna');
  });
});

describe('no products on main page', () => {
  beforeEach(() => {
    cy.server();
    cy.fixture('products_mock_data.json').then((rc) => {
      productsMock.getShopProducts(rc.noProducts);
    });
    cy.visit('http://www.sklep.localhost:3000');
    cy.wait('@getShopProducts');
  });

  it('should render home page without any products', () => {
    cy.get('body').should('contain.text', 'Brak produktów');
  });
});

describe('multiple products on main page', () => {
  beforeEach(() => {
    cy.server();
    cy.fixture('products_mock_data.json').then((rc) => {
      productsMock.getShopProducts(rc.mockedProducts);
    });
    cy.visit('http://www.sklep.localhost:3000');
    cy.wait('@getShopProducts');
  });

  it("shoud be 1 item in CartStatus badge - 1x click 'Do koszyka'", () => {
    cy.contains('Do koszyka').click();
    cy.wait(2000);
    cy.get('span')
      .contains('Liczba produktów w koszyku:')
      .parent('span')
      .should('contain.text', '1');
  });

  it("should be 3 items in CartStatus badge - 3x click 'Do koszyka'", () => {
    cy.contains('Do koszyka').click();
    cy.wait(1000);
    cy.contains('Do koszyka').click();
    cy.wait(1000);
    cy.contains('Do koszyka').click();
    cy.wait(2000);
    cy.get('span')
      .contains('Liczba produktów w koszyku:')
      .parent('span')
      .should('contain.text', '3');
  });
});
