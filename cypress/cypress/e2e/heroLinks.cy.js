describe('Hero Section - Main Link - High Res', () => {

    it('Both Hero Buttons should be visible and navigate correctly', () => {

        cy.start('high'); // high resolution
        cy.on('uncaught:exception', () => false);

        // Valida o botão primário "Build your demo"
        cy.get('a.button.hero-button.primary')
            .should('be.visible')
            .and('contain.text', 'Build your demo')
            .invoke('removeAttr', 'target')
            .click();

        cy.url().should('eq', 'https://www.lumahealth.io/book-a-demo/');

        // Volta para a home para testar o segundo botão
        cy.visit('https://www.lumahealth.io/');

        // Valida o botão secundário "See what it does"
        cy.get('a.button.hero-button.outlined')
            .should('be.visible')
            .and('contain.text', 'See what it does')
            .invoke('removeAttr', 'target')
            .click();

        cy.url().should('eq', 'https://www.lumahealth.io/patient-success-platform/');
    });

});

describe('Hero Section- Main Link - Med Res', () => {

    it('Both Hero Buttons should be visible and navigate correctly', () => {

        cy.start('med'); // high resolution
        cy.on('uncaught:exception', () => false);

        // Valida o botão primário "Build your demo"
        cy.get('a.button.hero-button.primary')
            .should('be.visible')
            .and('contain.text', 'Build your demo')
            .invoke('removeAttr', 'target')
            .click();

        cy.url().should('eq', 'https://www.lumahealth.io/book-a-demo/');

        // Volta para a home para testar o segundo botão
        cy.visit('https://www.lumahealth.io/');

        // Valida o botão secundário "See what it does"
        cy.get('a.button.hero-button.outlined')
            .should('be.visible')
            .and('contain.text', 'See what it does')
            .invoke('removeAttr', 'target')
            .click();

        cy.url().should('eq', 'https://www.lumahealth.io/patient-success-platform/');
    });

});

describe('Hero Section- Main Link - Low Res', () => {

    it('Both Hero Buttons should be visible and navigate correctly', () => {

        cy.start('low'); // high resolution
        cy.on('uncaught:exception', () => false);

        // Valida o botão primário "Build your demo"
        cy.get('a.button.hero-button.primary')
            .should('be.visible')
            .and('contain.text', 'Build your demo')
            .invoke('removeAttr', 'target')
            .click();

        cy.url().should('eq', 'https://www.lumahealth.io/book-a-demo/');

        // Volta para a home para testar o segundo botão
        cy.visit('https://www.lumahealth.io/');

        // Valida o botão secundário "See what it does"
        cy.get('a.button.hero-button.outlined')
            .should('be.visible')
            .and('contain.text', 'See what it does')
            .invoke('removeAttr', 'target')
            .click();

        cy.url().should('eq', 'https://www.lumahealth.io/patient-success-platform/');
    });

});