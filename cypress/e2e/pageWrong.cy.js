const VIEWPORTS = ['macbook-16', 'ipad-2', 'iphone-8'];

describe('404 Page - Non-existent URL', () => {

  VIEWPORTS.forEach(viewport => {
    it(`should display 404 page correctly on ${viewport} resolution`, () => {
      cy.viewport(viewport); // Define a resolução
      cy.on('uncaught:exception', () => false);

      // Acessa URL inexistente
      cy.visit('https://www.lumahealth.io/nonexistentpage', { failOnStatusCode: false });

      // Valida título "Page Not Found"
      cy.get('h1.entry-title')
        .should('be.visible')
        .and('contain.text', 'Page Not Found');

      // Valida descrição
      cy.get('.intro-text p')
        .should('be.visible')
        .and('contain.text', 'The page you were looking for could not be found');

      // Valida formulário de busca
      cy.get('form#searchform')
        .should('exist')
        .and('be.visible');

      cy.get('form#searchform input[type="text"]')
        .should('exist')
        .and('be.visible');

      cy.get('form#searchform input[type="submit"]')
        .should('exist')
        .and('be.visible');
    });
  });

});
