Cypress.Commands.add('start', (resolution = 'high') => {
    // Ajusta o viewport
    switch (resolution) {
        case 'high': cy.viewport('macbook-16'); break;
        case 'med': cy.viewport('ipad-2'); break;
        case 'low': cy.viewport('iphone-8'); break;
        default: cy.viewport('macbook-16');
    }

    // Agora pode visitar sem travamento
    cy.visit('https://www.lumahealth.io/', {
        timeout: 360000,
        failOnStatusCode: false
    });

    cy.on('uncaught:exception', () => false);

    // Remove banner se ainda existir
    cy.get('body').then(($body) => {
        if ($body.find('#main-banner').length > 0) {
            cy.get('#main-banner').invoke('remove');
        }
    });
});

Cypress.Commands.add('checkButton', (selector, text, href) => {
    cy.get(selector)
        .should('be.visible')
        .and('contain.text', text)
        .and('have.attr', 'href', href)
        .and('not.be.disabled');
});

Cypress.Commands.add('validateFooter', (footerTitles, footerLinks, socialLinks) => {
    footerTitles.forEach(title => cy.contains('footer', title).should('be.visible'));

    footerLinks.forEach(link => {
        cy.contains('footer .left-content a', link.text)
            .should('be.visible')
            .and('have.attr', 'href', link.href);
    });

    socialLinks.forEach(link => {
        cy.get(`footer .social-menu a.${link.class}`)
            .should('be.visible')
            .and('have.attr', 'href', link.href);
    });
});



