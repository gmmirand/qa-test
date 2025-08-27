import { mainMenus, footerTitles, bottomFooterLinks, socialLinks } from '../pages/HomePage';

const viewports = [
  { name: 'high', hamburger: false },
  { name: 'med', hamburger: true },
  { name: 'low', hamburger: true }
];

viewports.forEach(({ name, hamburger }) => {
  describe(`Validate homePage main elements - ${name} resolution`, () => {

    beforeEach(() => {
      cy.start(name);
    });

    it('Should load homepage successfully', () => {
      cy.request('/').its('status').should('eq', 200);
    });

    it('Validate header elements', () => {
      cy.get('a.navbar-logo img[alt="luma"]').should('be.visible');

      if (hamburger) {
        cy.get('a.navbar-trigger').should('be.visible').click();
        mainMenus.forEach(menu =>
          cy.contains('#navbar .main-menu-v2 > li a', menu, { matchCase: false }).should('exist')
        );
      } else {
        mainMenus.forEach(menu =>
          cy.contains('#navbar .main-menu-v2 > li a', menu, { matchCase: false }).should('be.visible')
        );

        cy.checkButton('#header_login', 'Log in', 'https://next.lumahealth.io/login');
        cy.checkButton('#navbar .actions a:contains("Get a demo")', 'Get a demo', 'https://www.lumahealth.io/book-a-demo');
      }
    });

    it('Validate hero section', () => {
      cy.get('.hero-text-container').should('be.visible');
      cy.get('.hero-section-title').should('contain.text', "Manual Tasks’ Worst Nightmare");
      cy.get('.hero-section-subtitle').should('contain.text', "Luma's AI-native Patient Success Platform™");
      cy.get('#heroVideo').should('be.visible');

      cy.checkButton('.hero-button-group a[title="Build your demo"]', 'Build your demo', 'https://www.lumahealth.io/book-a-demo');
      cy.checkButton('.hero-button-group a[title="See what it does"]', 'See what it does', 'https://www.lumahealth.io/patient-success-platform');
    });

    it('Validate footer and main sections', () => {
      cy.validateFooter(footerTitles, bottomFooterLinks, socialLinks);

      cy.get('section.top-logos .owl-carousel').should('be.visible');
      cy.get('.testimonial-wrapper').should('exist');

      cy.get('.workflow-container a').each($link => {
        expect($link.prop('href')).to.include('lumahealth.io/patient-success-platform');
      });

      cy.get('.counter-container').should('be.visible');
      cy.get('.counter-title').should('contain.text', 'patients and counting');

      cy.get('section.get-started-patient-success .luma-banner-container').should('be.visible');
      cy.checkButton('section.get-started-patient-success a.button.primary', 'Book a demo', 'https://www.lumahealth.io/book-a-demo');
    });

  });
});
