const VIEWPORTS = ['macbook-16', 'ipad-2', 'iphone-8'];

describe('404 Page - Non-existent URL', () => {

  VIEWPORTS.forEach(viewport => {
    it(`should display 404 page correctly on ${viewport} resolution`, () => {
      cy.viewport(viewport); // Set viewport based on current device resolution
      cy.on('uncaught:exception', () => false); // Ignore unexpected exceptions to avoid false negatives

      // Visit a non-existent page (expecting 404)
      cy.visit('https://www.lumahealth.io/nonexistentpage', { failOnStatusCode: false });

      // Validate page title "Page Not Found"
      cy.get('h1.entry-title')
        .should('be.visible')
        .and('contain.text', 'Page Not Found');

      // Validate description message
      cy.get('.intro-text p')
        .should('be.visible')
        .and('contain.text', 'The page you were looking for could not be found');

      // Validate search form exists and is visible
      cy.get('form#searchform')
        .should('exist')
        .and('be.visible');

      // Validate search input field exists and is visible
      cy.get('form#searchform input[type="text"]')
        .should('exist')
        .and('be.visible');

      // Validate search submit button exists and is visible
      cy.get('form#searchform input[type="submit"]')
        .should('exist')
        .and('be.visible');
    });
  });

});
