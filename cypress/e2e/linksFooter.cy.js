const FOOTER_LINKS = [
    {
        title: 'Terms of use',
        url: '/terms-of-use',
        header: 'Luma Health Terms of use'
    },
    {
        title: 'Privacy policy',
        url: '/privacy-policy',
        header: 'Privacy Policy'
    },
    {
        title: 'System status',
        url: 'https://status.lumahealth.io/',
        header: 'All Systems Operational',
        external: true
    },
    {
        title: 'Security and trust',
        url: '/security-and-trust',
        header: 'Information Security, Data Privacy, and Trust at Luma Health'
    },
];

const RESOLUTIONS = ['high', 'med', 'low'];

// Validates footer link navigation (handles internal and external links)
function validateFooterLink(link) {
    cy.log(`Validating footer link: ${link.title}`);

    // Click footer link (remove target="_blank" to stay in the same tab)
    cy.get(`.f-sub-menu a[title="${link.title}"]`)
        .should('be.visible')
        .then($el => $el.removeAttr('target'))
        .click();

    // Validate page content based on link type (internal vs. external)
    if (link.external) {
        cy.origin(link.url, { args: { expectedHeader: link.header } }, ({ expectedHeader }) => {
            cy.get('div.page-status h2.status').should('contain.text', expectedHeader);
        });
    } else {
        cy.get('h1').should('contain.text', link.header);
    }
}

RESOLUTIONS.forEach(resolution => {
    describe(`Footer Links - ${resolution.toUpperCase()} Resolution`, () => {

        beforeEach(() => {
            // Set viewport and visit homepage
            cy.start(resolution);
        });

        FOOTER_LINKS.forEach(link => {
            it(`Should navigate correctly when clicking '${link.title}'`, () => {
                validateFooterLink(link);
            });
        });
    });
});