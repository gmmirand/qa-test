// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('start', (resolution = 'high') => {
    switch (resolution) {
        case 'high':   // desktop
            cy.viewport('macbook-16')
            break
        case 'med':    // tablet
            cy.viewport('ipad-2')
            break
        case 'low':    // mobile
            cy.viewport('iphone-8')
            break
        default:
            cy.viewport('macbook-16')
    }

    cy.visit('https://www.lumahealth.io/')
})


