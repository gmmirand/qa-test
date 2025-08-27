const socialLinks = [
    { title: 'facebook', url: 'https://www.facebook.com/lumahealth' },
    { title: 'twitter', url: 'https://twitter.com/lumahealthhq' },
    { title: 'linkedin', url: 'https://www.linkedin.com/company/6403362' },
    { title: 'angellist', url: 'https://angel.co/luma-health' },
];

// Iterate through all defined viewports (high, med, low)
['high', 'med', 'low'].forEach(res => {

    describe(`Footer Social Links - ${res.toUpperCase()}`, () => {

        beforeEach(() => {
            cy.start(res); // Set viewport and open homepage
        });

        // Validate each social link in the footer
        socialLinks.forEach(link => {
            it(`Should display ${link.title} link with correct href`, () => {

                cy.get(`.social-menu a[title="${link.title}"]`)
                    .should('be.visible')              // Link must be visible in the UI
                    .and('have.attr', 'href', link.url); // Link must have the correct URL

            });
        });

    });

});
