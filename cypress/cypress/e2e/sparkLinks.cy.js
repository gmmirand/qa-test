describe('Spark HomePage - Main Link - High Res', () => {

    it('Deve acessar a página Spark e validar os elementos principais', () => {

        cy.start('high'); // high resolution
        cy.on('uncaught:exception', () => false);

        // Valida o botão na home
        cy.get('.introduce-spark-container .introduce-spark-bottom a')
            .should('be.visible')
            .and('have.attr', 'href', 'https://www.lumahealth.io/patient-success-platform/ai-spark/')
            .click();

        // Aguarda carregamento da URL correta
        cy.url().should('include', '/patient-success-platform/ai-spark/');

        // Valida título principal "Introducing Spark"
        cy.contains('span', 'Spark')
            .should('be.visible');

        cy.request('https://go.lumahealth.io/patient-success-platform/ai-spark')
            .its('status')
            .should('eq', 200);

    });
});

describe('Spark HomePage - Main Link - Med Res', () => {

    it('Deve acessar a página Spark e validar os elementos principais', () => {

        cy.start('Med'); // high resolution
        cy.on('uncaught:exception', () => false);

        // Valida o botão na home
        cy.get('.introduce-spark-container .introduce-spark-bottom a')
            .should('be.visible')
            .and('have.attr', 'href', 'https://www.lumahealth.io/patient-success-platform/ai-spark/')
            .click();

        // Aguarda carregamento da URL correta
        cy.url().should('include', '/patient-success-platform/ai-spark/');

        // Valida título principal "Introducing Spark"
        cy.contains('span', 'Spark')
            .should('be.visible');

        cy.request('https://go.lumahealth.io/patient-success-platform/ai-spark')
            .its('status')
            .should('eq', 200);

    });
});

describe('Spark HomePage - Main Link - Low Res', () => {

    it('Deve acessar a página Spark e validar os elementos principais', () => {

        cy.start('low'); // high resolution
        cy.on('uncaught:exception', () => false);

        // Valida o botão na home
        cy.get('.introduce-spark-container .introduce-spark-bottom a')
            .should('be.visible')
            .and('have.attr', 'href', 'https://www.lumahealth.io/patient-success-platform/ai-spark/')
            .click();

        // Aguarda carregamento da URL correta
        cy.url().should('include', '/patient-success-platform/ai-spark/');

        // Valida título principal "Introducing Spark"
        cy.contains('span', 'Spark')
            .should('exist');

    });
});