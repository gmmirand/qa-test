const resolutions = ['high', 'med', 'low']

describe('Access Luma URL successfully', () => {
    resolutions.forEach(res => {
        it(`Verify if homepage loads successfully on ${res} resolution`, () => {
            cy.start(res) // Usa o comando customizado que define o viewport e visita a página

            // Verifica status da página
            cy.request('/').its('status').should('eq', 200)

            // URL e título
            cy.url().should('eq', 'https://www.lumahealth.io/')
            cy.title().should('include', 'Luma Health')

            // Navbar
            cy.get('#navbar').should('be.visible')

            // Botões de hero
            cy.get('.hero-button-group a[title="Build your demo"]').should('be.visible')

            // Footer
            cy.get('footer')
                .should('be.visible')
                .and('contain.text', 'Luma Health Inc')

            // Opcional: se for tablet ou mobile, validar trigger do menu
            if (res !== 'high') {
                cy.get('.navbar-trigger').should('be.visible')
            }
        })
    })
})
