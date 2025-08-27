const viewports = ['high', 'med', 'low'];

const validateHeroButton = (selector, text, url) => {
  cy.get(selector)
    .should('be.visible')
    .and('contain.text', text)
    .invoke('removeAttr', 'target')
    .click();
  cy.url().should('eq', url);
};

viewports.forEach(resolution => {
  describe(`Hero Section - Main Links - ${resolution.toUpperCase()} Res`, () => {
    
    beforeEach(() => {
      cy.start(resolution);
    });

    it('Both Hero Buttons should be visible and navigate correctly', () => {
      // Botão primário
      validateHeroButton(
        'a.button.hero-button.primary',
        'Build your demo',
        'https://www.lumahealth.io/book-a-demo/'
      );

      // Volta para a home para testar o segundo botão
      cy.start(resolution); // pode usar cy.visit('https://www.lumahealth.io/') também

      // Botão secundário
      validateHeroButton(
        'a.button.hero-button.outlined',
        'See what it does',
        'https://www.lumahealth.io/patient-success-platform/'
      );
    });
  });
});
