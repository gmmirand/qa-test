import { mainMenus, footerTitles, bottomFooterLinks, socialLinks } from '../pages/HomePage';

// List of viewports to test (custom viewport handling is defined in cy.start)
const viewports = [
  { name: 'high', hamburger: false }, // Desktop resolution (no hamburger menu)
  { name: 'med', hamburger: true },   // Tablet resolution (hamburger menu visible)
  { name: 'low', hamburger: true }    // Mobile resolution (hamburger menu visible)
];

viewports.forEach(({ name, hamburger }) => {
  describe(`Validate HomePage main elements - ${name} resolution`, () => {

    beforeEach(() => {
      // Set viewport and visit homepage using the custom command
      cy.start(name);
    });

    it('Should load homepage successfully', () => {
      // Verify that the homepage responds with HTTP 200 (OK)
      cy.request('/').its('status').should('eq', 200);
    });

    it('Validate header elements', () => {
      // Check if logo is visible in the header
      cy.get('a.navbar-logo img[alt="luma"]').should('be.visible');

      // If on tablet/mobile, validate the hamburger menu and its items
      if (hamburger) {
        cy.get('a.navbar-trigger').should('be.visible').click();
        mainMenus.forEach(menu =>
          cy.contains('#navbar .main-menu-v2 > li a', menu, { matchCase: false }).should('exist')
        );
      }
      // If on desktop, validate that the full menu and action buttons are visible
      else {
        mainMenus.forEach(menu =>
          cy.contains('#navbar .main-menu-v2 > li a', menu, { matchCase: false }).should('be.visible')
        );

        // Validate header action buttons ("Log in" and "Get a demo")
        cy.checkButton('#header_login', 'Log in', 'https://next.lumahealth.io/login');
        cy.checkButton(
          '#navbar .actions a:contains("Get a demo")',
          'Get a demo',
          'https://www.lumahealth.io/book-a-demo'
        );
      }
    });

    it('Validate hero section', () => {
      // Validate that the hero section elements (title, subtitle, video) are present
      cy.get('.hero-text-container').should('be.visible');
      cy.get('.hero-section-title').should('contain.text', "Manual Tasks’ Worst Nightmare");
      cy.get('.hero-section-subtitle').should('contain.text', "Luma's AI-native Patient Success Platform™");
      cy.get('#heroVideo').should('be.visible');

      // Validate hero section buttons and their URLs
      cy.checkButton(
        '.hero-button-group a[title="Build your demo"]',
        'Build your demo',
        'https://www.lumahealth.io/book-a-demo'
      );
      cy.checkButton(
        '.hero-button-group a[title="See what it does"]',
        'See what it does',
        'https://www.lumahealth.io/patient-success-platform'
      );
    });

    it('Validate footer and main sections', () => {
      // Validate footer content using a custom command (checks titles, links, and social icons)
      cy.validateFooter(footerTitles, bottomFooterLinks, socialLinks);

      // Validate additional main page elements below the hero section
      cy.get('section.top-logos .owl-carousel').should('be.visible'); // Partner logos carousel
      cy.get('.testimonial-wrapper').should('exist');                // Testimonials section

      // Validate that workflow links direct to the expected platform URL
      cy.get('.workflow-container a').each($link => {
        expect($link.prop('href')).to.include('lumahealth.io/patient-success-platform');
      });

      // Validate counter section (e.g., number of patients)
      cy.get('.counter-container').should('be.visible');
      cy.get('.counter-title').should('contain.text', 'patients and counting');

      // Validate final CTA (Call-to-Action) section with the "Book a demo" button
      cy.get('section.get-started-patient-success .luma-banner-container').should('be.visible');
      cy.checkButton(
        'section.get-started-patient-success a.button.primary',
        'Book a demo',
        'https://www.lumahealth.io/book-a-demo'
      );
    });

  });
});
