// Custom command to start tests by setting viewport and visiting the homepage
Cypress.Commands.add('start', (resolution = 'high') => {
    // Set viewport based on provided resolution
    switch (resolution) {
        case 'high': cy.viewport('macbook-16'); break;
        case 'med': cy.viewport('ipad-2'); break;
        case 'low': cy.viewport('iphone-8'); break;
        default: cy.viewport('macbook-16');
    }

    // Visit homepage with extended timeout and prevent test failure on non-200 status
    cy.visit('https://www.lumahealth.io/', {
        timeout: 360000,
        failOnStatusCode: false
    });

    // Prevent uncaught exceptions from failing the test
    cy.on('uncaught:exception', () => false);

    // Remove main banner if it exists to prevent overlay issues
    cy.get('body').then(($body) => {
        if ($body.find('#main-banner').length > 0) {
            cy.get('#main-banner').invoke('remove');
        }
    });
});

// Custom command to validate a button's visibility, text, href, and enabled state
Cypress.Commands.add('checkButton', (selector, text, href) => {
    cy.get(selector)
        .should('be.visible')       // Button must be visible in the UI
        .and('contain.text', text)  // Button must contain expected text
        .and('have.attr', 'href', href) // Button must link to correct URL
        .and('not.be.disabled');    // Button must be enabled
});

// Custom command to validate all main footer elements including section titles, links, and social icons
Cypress.Commands.add('validateFooter', (footerTitles, footerLinks, socialLinks) => {
    // Validate that all footer section titles are visible
    footerTitles.forEach(title => cy.contains('footer', title).should('be.visible'));

    // Validate footer links text and href
    footerLinks.forEach(link => {
        cy.contains('footer .left-content a', link.text)
            .should('be.visible')
            .and('have.attr', 'href', link.href);
    });

    // Validate social links with class and href
    socialLinks.forEach(link => {
        cy.get(`footer .social-menu a.${link.class}`)
            .should('be.visible')
            .and('have.attr', 'href', link.href);
    });
});
