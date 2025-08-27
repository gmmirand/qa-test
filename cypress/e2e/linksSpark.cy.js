const RESOLUTIONS = ['high', 'med', 'low'];
const SPARK_IFRAME_URL = 'https://www.lumahealth.io/patient-success-platform/ai-spark/';

RESOLUTIONS.forEach(resolution => {
  describe(`Spark HomePage - Main Link - ${resolution.toUpperCase()} Res`, () => {

    beforeEach(() => {
      cy.start(resolution);
        });

    it('Deve validar botão e página Spark', () => {
      // Valida botão na home
      cy.get('.introduce-spark-container .introduce-spark-bottom a')
        .should('be.visible')
        .and('have.attr', 'href', SPARK_IFRAME_URL);

      if (resolution === 'high') {
        // Desktop: clica e verifica URL normal
        cy.get('.introduce-spark-container .introduce-spark-bottom a').click();
        cy.url().should('include', '/patient-success-platform/ai-spark/');
        cy.contains('span', 'Spark').should('be.visible');
      }

      // Para todos: valida que a página do iframe responde 200
      cy.request(SPARK_IFRAME_URL).its('status').should('eq', 200);
    });

  });
});
