const RESOLUTIONS = ['high', 'med', 'low'];
const SPARK_IFRAME_URL = 'https://www.lumahealth.io/patient-success-platform/ai-spark/';

// Iterate through all defined viewports (high, med, low)
RESOLUTIONS.forEach(resolution => {
  describe(`Spark HomePage - Main Link - ${resolution.toUpperCase()} Res`, () => {

    beforeEach(() => {
      cy.start(resolution); // Set viewport and navigate to the homepage
    });

    it('Should validate Spark button and page behavior', () => {

      // Validate Spark button is visible on homepage and has correct href
      cy.get('.introduce-spark-container .introduce-spark-bottom a')
        .should('be.visible')
        .and('have.attr', 'href', SPARK_IFRAME_URL);

      // For desktop (high resolution): click the button and verify correct navigation
      if (resolution === 'high') {
        cy.get('.introduce-spark-container .introduce-spark-bottom a').click();
        cy.url().should('include', '/patient-success-platform/ai-spark/');
        cy.contains('span', 'Spark').should('be.visible'); // Ensure page content is loaded
      }

      // For all resolutions: ensure Spark iframe URL returns HTTP 200 (reachable)
      cy.request(SPARK_IFRAME_URL).its('status').should('eq', 200);
    });

  });
});
