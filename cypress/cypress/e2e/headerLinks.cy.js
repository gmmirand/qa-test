describe('Header - Main Links - High Res', () => {

    const SELECTORS = {
        logo: 'a.navbar-logo',
        mainMenu: 'ul.main-menu-v2 > li > a.hide-mobile',
        loginBtn: 'a#header_login',
        demoBtn: '#navbar div.actions > a.button.primary',
        iframe: 'iframe.iframe-full-height'
    };

    const LINKS = {
        homepage: 'https://www.lumahealth.io',
        platform: 'https://www.lumahealth.io/patient-success-platform',
        platformIframe: 'https://go.lumahealth.io/patient-success-platform/',
        whoWeServe: 'https://www.lumahealth.io/who-we-serve',
        whoWeServeIframe: 'https://go.lumahealth.io/who-we-serve',
        integrations: 'https://www.lumahealth.io/integrations-2',
        integrationsIframe: 'https://go.lumahealth.io/integrations',
        learn: 'https://www.lumahealth.io/learn',
        aboutUs: 'https://www.lumahealth.io/about-us',
        login: 'https://next.lumahealth.io/login',
        demo: 'https://www.lumahealth.io/book-a-demo/',
        demoIframe: 'https://go.lumahealth.io/book-a-demo-embed'
    };

    beforeEach(() => {
        cy.on('uncaught:exception', () => false);
        cy.start('high');
    });

    // --- Funções utilitárias ---
    function clickAndValidateIframe(linkSelector, iframeSrc) {
        cy.get(linkSelector)
            .should('exist')
            .and('be.visible')
            .click();

        if (iframeSrc) {
            cy.get(SELECTORS.iframe, { timeout: 10000 })
                .should('be.visible')
                .and('have.attr', 'src', iframeSrc);

            cy.request(iframeSrc).its('status').should('eq', 200);
        }
    }

    function validateLogo() {
        cy.get(SELECTORS.logo)
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'href', LINKS.homepage);

        cy.get(SELECTORS.logo).click();
        cy.url().should('eq', LINKS.homepage + '/');
        cy.get('nav#navbar').should('be.visible');
        cy.get(`${SELECTORS.logo} img`).should('be.visible');
    }

    // --- Testes ---
    it('Homepage link in header logo should work as expected', () => {
        validateLogo();
    });

    it('Platform link in header should work as expected', () => {
        clickAndValidateIframe(`${SELECTORS.mainMenu}[href="${LINKS.platform}"]`, LINKS.platformIframe);
    });

    it('Who We Serve link in header should work as expected', () => {
        clickAndValidateIframe(`${SELECTORS.mainMenu}[href="${LINKS.whoWeServe}"]`, LINKS.whoWeServeIframe);
        cy.contains('Who We Serve').should('be.visible');
    });

    it('Integrations link in header should work as expected', () => {
        clickAndValidateIframe(`${SELECTORS.mainMenu}[href="${LINKS.integrations}"]`, LINKS.integrationsIframe);
        cy.contains('Integrations').should('be.visible');
    });

    it('Learn link in header should work as expected', () => {
        cy.get(`${SELECTORS.mainMenu}[href="${LINKS.learn}"]`).click();
        cy.contains('Learnings from the Luma Community').should('be.visible');
        cy.contains('Stories, tips, and resources from Luma and our community members to help you and your patients succeed.')
            .should('be.visible');

        cy.get('#input-query-learn').should('be.visible');
        cy.get('.labelfilter-org').should('exist');
        cy.get('.labelfilter-ehr').should('exist');
        cy.get('.labelfilter-sol').should('exist');
        cy.get('.container-learn').should('be.visible');
    });

    it('About US link in header should work as expected', () => {
        cy.get(`${SELECTORS.mainMenu}[href="${LINKS.aboutUs}"]`).click();
        cy.url().should('include', '/about-us');

        cy.contains('ABOUT US').should('be.visible');
        cy.contains('Meet Luma').should('be.visible');
        cy.contains('We care — for each other, for patients, and for our work.').should('be.visible');

        cy.get('div.columns img')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
            });

        cy.get('a.button.primary[title="Join the team"]')
            .should('have.attr', 'href', 'https://boards.greenhouse.io/lumahealth')
            .and('contain.text', 'Join the team');

        cy.get('a.button.outlined[title="Get in touch"]')
            .should('have.attr', 'href', 'mailto: info@lumahealth.io')
            .and('contain.text', 'Get in touch');
    });

    it('Log in button link in header should work as expected', () => {
        cy.get(SELECTORS.loginBtn)
            .invoke('removeAttr', 'target')
            .click();

        cy.url().should('eq', LINKS.login);

        cy.origin('https://next.lumahealth.io', () => {
            cy.get('input[name="email"]').should('be.visible');
            cy.get('input[name="password"]').should('be.visible');
            cy.get('button[type="submit"]').contains('Sign in').should('be.visible');
            cy.get('a[href="https://sso.lumahealth.io"]').contains('Use single sign-on').should('be.visible');
            cy.contains('Reset password').should('be.visible');
        });
    });

    it('Get a demo button link in header should work as expected', () => {
        cy.get(SELECTORS.demoBtn)
            .invoke('removeAttr', 'target')
            .click();

        cy.url().should('eq', LINKS.demo);
        cy.contains('Get a demo').should('be.visible');

        cy.get(SELECTORS.iframe).should('be.visible')
            .and('have.attr', 'src', LINKS.demoIframe);

        cy.get(SELECTORS.iframe)
            .invoke('attr', 'src')
            .then((iframeSrc) => {
                cy.request(iframeSrc).its('status').should('eq', 200);
            });
    });

});

describe('Header - Main Links - Medium Res', () => {

    const validateIframe = () => {
        cy.get('iframe').then($iframe => {
            if ($iframe.length) {
                const src = $iframe.attr('src');
                if (src) {
                    cy.request(src).its('status').should('eq', 200);
                }
            }
        });
    };


    const openHamburgerAndSubmenu = (submenu) => {
        cy.get('a.navbar-trigger').click();
        cy.get('ul.main-menu-v2').should('be.visible');

        cy.contains('li.mobile-accordion', submenu)
            .find('> a.hide-desktop')
            .click()
            .parent()
            .should('have.class', 'mobile-accordion active');
    };

    const clickLinkAndValidateUrl = (linkText, url) => {
        cy.contains('li.has-not-description a, li.has-description a', linkText)
            .should('be.visible')
            .invoke('removeAttr', 'target')
            .click();
        cy.url().should('eq', url);
        validateIframe();
    };

    beforeEach(() => {
        cy.start('med'); // resolução média
        cy.on('uncaught:exception', () => false);
    });

    const menuLinks = [
        { submenu: 'Platform', link: 'Access & Retention', url: 'https://www.lumahealth.io/patient-success-platform/patient-access-and-retention/' },
        { submenu: 'Who We Serve', link: 'Who We Serve', url: 'https://www.lumahealth.io/who-we-serve/' },
        { submenu: 'Integrations', link: 'EHR Integrations', url: 'https://www.lumahealth.io/integrations-2/' },
    ];

    menuLinks.forEach(item => {
        it(`${item.submenu} submenu link "${item.link}" should work`, () => {
            openHamburgerAndSubmenu(item.submenu);
            clickLinkAndValidateUrl(item.link, item.url);
        });
    });

    it('Learn submenu link should work', () => {
        openHamburgerAndSubmenu('Learn');
        clickLinkAndValidateUrl('Learn Hub', 'https://www.lumahealth.io/learn/');

        // Valida os textos h1 e h4
        cy.get('h1').should('contain.text', 'Learnings from the Luma Community');
        cy.get('h4').should('contain.text', 'Stories, tips, and resources from Luma and our community members to help you and your patients succeed.');
    });

    it('About Us link should navigate and show correct page titles', () => {
        openHamburgerAndSubmenu('About us');
        clickLinkAndValidateUrl('About us', 'https://www.lumahealth.io/about-us/');

        cy.contains('p', 'ABOUT US').should('be.visible');
        cy.contains('h1', 'Meet Luma').should('be.visible');
    });

});

describe('Header - Main Links - Low Res', () => {

    const validateIframe = () => {
        cy.get('iframe').then($iframe => {
            if ($iframe.length) {
                const src = $iframe.attr('src');
                if (src) {
                    cy.request(src).its('status').should('eq', 200);
                }
            }
        });
    };


    const openHamburgerAndSubmenu = (submenu) => {
        cy.get('a.navbar-trigger').click();
        cy.get('ul.main-menu-v2').should('be.visible');

        cy.contains('li.mobile-accordion', submenu)
            .find('> a.hide-desktop')
            .click()
            .parent()
            .should('have.class', 'mobile-accordion active');
    };

    const clickLinkAndValidateUrl = (linkText, url) => {
        cy.contains('li.has-not-description a, li.has-description a', linkText)
            .should('be.visible')
            .invoke('removeAttr', 'target')
            .click();
        cy.url().should('eq', url);
        validateIframe();
    };

    beforeEach(() => {
        cy.start('low'); // resolução média
        cy.on('uncaught:exception', () => false);
    });

    const menuLinks = [
        { submenu: 'Platform', link: 'Access & Retention', url: 'https://www.lumahealth.io/patient-success-platform/patient-access-and-retention/' },
        { submenu: 'Who We Serve', link: 'Who We Serve', url: 'https://www.lumahealth.io/who-we-serve/' },
        { submenu: 'Integrations', link: 'EHR Integrations', url: 'https://www.lumahealth.io/integrations-2/' },
    ];

    menuLinks.forEach(item => {
        it(`${item.submenu} submenu link "${item.link}" should work`, () => {
            openHamburgerAndSubmenu(item.submenu);
            clickLinkAndValidateUrl(item.link, item.url);
        });
    });

    it('Learn submenu link should work', () => {
        openHamburgerAndSubmenu('Learn');
        clickLinkAndValidateUrl('Learn Hub', 'https://www.lumahealth.io/learn/');

        // Valida os textos h1 e h4
        cy.get('h1').should('contain.text', 'Learnings from the Luma Community');
        cy.get('h4').should('contain.text', 'Stories, tips, and resources from Luma and our community members to help you and your patients succeed.');
    });

    it('About Us link should navigate and show correct page titles', () => {
        openHamburgerAndSubmenu('About us');
        clickLinkAndValidateUrl('About us', 'https://www.lumahealth.io/about-us/');

        cy.contains('p', 'ABOUT US').should('be.visible');
        cy.contains('h1', 'Meet Luma').should('be.visible');
    });

});