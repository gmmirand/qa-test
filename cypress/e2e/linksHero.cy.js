const viewports = ['high', 'med', 'low'];

/**
 * Validates that a hero button:
 * - Is visible
 * - Contains the expected text
 * - Opens the expected URL (after removing the target attribute to stay in the same tab)
 */
const validateHeroButton = (selector, text, url) => {
    cy.get(selector)
        .should('be.visible')
        .and('contain.text', text)
        .invoke('removeAttr', 'target')
        .click();
    cy.url().should('eq', url);
};

viewports.forEach(resolution => {
    describe(`Hero Section - Main Links - ${resolution.toUpperCase()} Res`, () => {

        beforeEach(() => {
            cy.start(resolution); // Sets viewport and navigates to homepage
        });

        it('Both Hero Buttons should be visible and navigate correctly', () => {
            // Validate primary CTA button (Book a Demo)
            validateHeroButton(
                'a.button.hero-button.primary',
                'Build your demo',
                'https://www.lumahealth.io/book-a-demo/'
            );

            // Reload homepage to validate secondary CTA button
            cy.start(resolution);

            // Validate secondary CTA button (Product Info)
            validateHeroButton(
                'a.button.hero-button.outlined',
                'See what it does',
                'https://www.lumahealth.io/patient-success-platform/'
            );
        });
    });
});
