const socialLinks = [
    { title: 'facebook', url: 'https://www.facebook.com/lumahealth' },
    { title: 'twitter', url: 'https://twitter.com/lumahealthhq' },
    { title: 'linkedin', url: 'https://www.linkedin.com/company/6403362' },
    { title: 'angellist', url: 'https://angel.co/luma-health' },
];

['high', 'med', 'low'].forEach(res => {

    describe(`Footer Social Links - ${res.toUpperCase()}`, () => {

        beforeEach(() => {
            cy.start(res);
        });

        socialLinks.forEach(link => {
            it(`Should display ${link.title} link with correct href`, () => {

                cy.get(`.social-menu a[title="${link.title}"]`)
                    .should('be.visible')
                    .and('have.attr', 'href', link.url);

            });
        });

    });

});
