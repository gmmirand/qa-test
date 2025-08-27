// List of screen resolutions to test (custom values handled by the `cy.start` command)
const resolutions = ['high', 'med', 'low']

describe('Access Luma URL successfully', () => {
    resolutions.forEach(res => {
        it(`Verify if homepage loads successfully on ${res} resolution`, () => {

            // Use the custom command to set the viewport and visit the homepage
            cy.start(res)

            // Validate that the homepage responds with a successful HTTP status (200)
            cy.request('/').its('status').should('eq', 200)

            // Validate correct URL and page title
            cy.url().should('eq', 'https://www.lumahealth.io/')
            cy.title().should('include', 'Luma Health')

            // Validate that the navigation bar is visible
            cy.get('#navbar').should('be.visible')

            // Validate that the "Build your demo" button is visible in the hero section
            cy.get('.hero-button-group a[title="Build your demo"]').should('be.visible')

            // Validate that the footer is visible and contains company information
            cy.get('footer')
                .should('be.visible')
                .and('contain.text', 'Luma Health Inc')

            // Additional check for tablet/mobile: verify that the menu trigger (hamburger) is present
            if (res !== 'high') {
                cy.get('.navbar-trigger').should('be.visible')
            }
        })
    })
})
