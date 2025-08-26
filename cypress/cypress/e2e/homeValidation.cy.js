describe('Validate main elements from homePage - High resolution', () => {

    const mainMenus = ['Platform', 'Who We Serve', 'Integrations', 'Learn', 'About us'];
    const footerTitles = [
        'Patient Success Platform',
        'Who We Serve',
        'Integrations',
        'Learn Hub',
        'Digital Health: On Air',
        'About Us',
        'Subscribe to our newsletter'
    ];
    const bottomFooterLinks = [
        { text: 'Terms of use', href: 'https://www.lumahealth.io/terms-of-use' },
        { text: 'Privacy policy', href: 'https://www.lumahealth.io/privacy-policy' },
        { text: 'System status', href: 'https://status.lumahealth.io/' },
        { text: 'Security and trust', href: 'https://www.lumahealth.io/security-and-trust' }
    ];
    const socialLinks = [
        { class: 'facebook', href: 'https://www.facebook.com/lumahealth' },
        { class: 'twitter', href: 'https://twitter.com/lumahealthhq' },
        { class: 'linkedin', href: 'https://www.linkedin.com/company/6403362' },
        { class: 'angellist', href: 'https://angel.co/luma-health' }
    ];

    const checkButton = (selector, text, href) => {
        cy.get(selector)
            .should('be.visible')
            .and('contain.text', text)
            .and('have.attr', 'href', href)
            .and('not.be.disabled');
    };

    beforeEach(() => {
        cy.start('high');
    });

    it('Should load homepage successfully', () => {
        cy.request('/').its('status').should('eq', 200);
    });

    it('Validate main header elements', () => {
        cy.get('a.navbar-logo img[alt="luma"]')
            .should('be.visible')
            .and('have.attr', 'src', 'https://www.lumahealth.io/wp-content/themes/LumaHealth2022/assets/images/logo.svg');

        mainMenus.forEach(menu => {
            cy.contains('#navbar .main-menu-v2 > li a', menu)
                .should('be.visible')
                .and('not.be.disabled');
        });

        checkButton('#header_login', 'Log in', 'https://next.lumahealth.io/login');
        checkButton('#navbar .actions a:contains("Get a demo")', 'Get a demo', 'https://www.lumahealth.io/book-a-demo');
    });

    it('Validate hero section elements', () => {
        cy.get('.hero-text-container').should('be.visible');
        cy.get('.hero-section-title').should('contain.text', "Manual Tasks’ Worst Nightmare");
        cy.get('.hero-section-subtitle').should('contain.text', "Luma's AI-native Patient Success Platform™");

        cy.get('#heroVideo')
            .should('be.visible')
            .and($video => {
                expect($video).to.have.attr('src', 'https://www.lumahealth.io/wp-content/uploads/2024/12/1350x674_1221_2.mp4');
                expect($video).to.have.prop('autoplay', true);
                expect($video).to.have.prop('muted', true);
                expect($video).to.have.prop('loop', true);
            });

        checkButton('.hero-button-group a[title="Build your demo"]', 'Build your demo', 'https://www.lumahealth.io/book-a-demo');
        checkButton('.hero-button-group a[title="See what it does"]', 'See what it does', 'https://www.lumahealth.io/patient-success-platform');
    });

    it('Should validate main footer titles', () => {
        footerTitles.forEach(title => {
            cy.contains('footer', title).should('be.visible');
        });
    });

    it('Should validate main bottom footer links', () => {
        bottomFooterLinks.forEach(link => {
            cy.contains('footer .left-content a', link.text)
                .should('be.visible')
                .and('have.attr', 'href', link.href);
        });
    });

    it('Should validate social media links', () => {
        socialLinks.forEach(link => {
            cy.get(`footer .social-menu a.${link.class}`)
                .should('be.visible')
                .and('have.attr', 'href', link.href);
        });
    });

    it('Should validate carousel is visible', () => {
        cy.get('section.top-logos .owl-carousel').should('be.visible');
    });

    it('Should validate "Learn more about Spark" button', () => {
        cy.get('.introduce-spark-bottom a')
            .should('be.visible')
            .and('have.attr', 'href', 'https://www.lumahealth.io/patient-success-platform/ai-spark/');
    });

    it('Verify if feedbacks carousel is displayed', () => {
        cy.get('.owl-carousel').should('be.visible');
        cy.get('.testimonial-wrapper').should('exist');
    });

    it('Should validate Workflow section links', () => {
        cy.get('.workflow-container a').each($link => {
            expect($link.prop('href')).to.include('lumahealth.io/patient-success-platform');
        });
    });

    it('Should render the patient counter correctly', () => {
        cy.get('.counter-container').should('be.visible');
        cy.get('.counter-title').should('contain.text', 'patients and counting');
        cy.get('.counter-subtitle').should('contain.text', "We're streamlining the healthcare journey");

        cy.get('.counter .digit .number').each($num => {
            const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            expect(validNumbers).to.include($num.text());
        });
    });

    it('Should display the banner and validate buttons', () => {
        cy.get('section.get-started-patient-success .luma-banner-container').should('be.visible');
        cy.get('section.get-started-patient-success h3').should('contain.text', 'Get started with Luma');

        cy.get('section.get-started-patient-success .actions a').should('have.length', 2);

        checkButton('section.get-started-patient-success a.button.primary', 'Book a demo', 'https://www.lumahealth.io/book-a-demo');
        checkButton('section.get-started-patient-success a.button.outlined.secondary', 'Learn more about the platform', 'https://www.lumahealth.io/patient-success-platform');
    });

});

describe('Validate main elements from homePage - Medium resolution', () => {

    const mainMenus = ['Platform', 'Who We Serve', 'Integrations', 'Learn', 'About us'];
    const footerTitles = [
        'Patient Success Platform',
        'Who We Serve',
        'Integrations',
        'Learn Hub',
        'Digital Health: On Air',
        'About Us',
        'Subscribe to our newsletter'
    ];
    const bottomFooterLinks = [
        { text: 'Terms of use', href: 'https://www.lumahealth.io/terms-of-use' },
        { text: 'Privacy policy', href: 'https://www.lumahealth.io/privacy-policy' },
        { text: 'System status', href: 'https://status.lumahealth.io/' },
        { text: 'Security and trust', href: 'https://www.lumahealth.io/security-and-trust' }
    ];
    const socialLinks = [
        { class: 'facebook', href: 'https://www.facebook.com/lumahealth' },
        { class: 'twitter', href: 'https://twitter.com/lumahealthhq' },
        { class: 'linkedin', href: 'https://www.linkedin.com/company/6403362' },
        { class: 'angellist', href: 'https://angel.co/luma-health' }
    ];

    const checkButton = (selector, text, href) => {
        cy.get(selector)
            .should('be.visible')
            .and('contain.text', text)
            .and('have.attr', 'href', href)
            .and('not.be.disabled');
    };

    beforeEach(() => {
        cy.start('med');
    });

    it('Should load homepage successfully', () => {
        cy.request('/').its('status').should('eq', 200);
    });

    it('Validate main header elements - tablet/mobile', () => {
        cy.get('a.navbar-logo img[alt="luma"]').should('be.visible');

        // abrir o menu hamburger
        cy.get('a.navbar-trigger').should('be.visible').click();

        // agora os links estão dentro do menu
        mainMenus.forEach(menu => {
            cy.contains('#navbar .main-menu-v2 > li a.hide-desktop', menu)
                .should('be.visible')
                .and('not.be.disabled');

        });
        cy.get('a.navbar-trigger').should('be.visible').click();

        // não validar Log in e Get a demo nesse layout
    });

    it('Validate hero section elements', () => {
        cy.get('.hero-text-container').should('be.visible');
        cy.get('.hero-section-title').should('contain.text', "Manual Tasks’ Worst Nightmare");
        cy.get('.hero-section-subtitle').should('contain.text', "Luma's AI-native Patient Success Platform™");

        cy.get('#heroVideo')
            .should('be.visible')
            .and($video => {
                expect($video).to.have.attr('src', 'https://www.lumahealth.io/wp-content/uploads/2024/12/1221.mov');
                expect($video).to.have.prop('autoplay', true);
                expect($video).to.have.prop('muted', true);
                expect($video).to.have.prop('loop', true);
            });

        checkButton('.hero-button-group a[title="Build your demo"]', 'Build your demo', 'https://www.lumahealth.io/book-a-demo');
        checkButton('.hero-button-group a[title="See what it does"]', 'See what it does', 'https://www.lumahealth.io/patient-success-platform');
    });

    it('Should validate main footer titles', () => {
        footerTitles.forEach(title => {
            cy.contains('footer', title).should('be.visible');
        });
    });

    it('Should validate main bottom footer links', () => {
        bottomFooterLinks.forEach(link => {
            cy.contains('footer .left-content a', link.text)
                .should('be.visible')
                .and('have.attr', 'href', link.href);
        });
    });

    it('Should validate social media links', () => {
        socialLinks.forEach(link => {
            cy.get(`footer .social-menu a.${link.class}`)
                .should('be.visible')
                .and('have.attr', 'href', link.href);
        });
    });

    it('Should validate carousel is visible', () => {
        cy.get('section.top-logos .owl-carousel').should('be.visible');
    });

    it('Should validate "Learn more about Spark" button', () => {
        cy.get('.introduce-spark-bottom a')
            .should('be.visible')
            .and('have.attr', 'href', 'https://www.lumahealth.io/patient-success-platform/ai-spark/');
    });

    it('Verify if feedbacks carousel is displayed', () => {
        cy.get('.owl-carousel').should('be.visible');
        cy.get('.testimonial-wrapper').should('exist');
    });

    it('Should validate Workflow section links', () => {
        cy.get('.workflow-container a').each($link => {
            expect($link.prop('href')).to.include('lumahealth.io/patient-success-platform');
        });
    });

    it('Should render the patient counter correctly', () => {
        cy.get('.counter-container').should('be.visible');
        cy.get('.counter-title').should('contain.text', 'patients and counting');
        cy.get('.counter-subtitle').should('contain.text', "We're streamlining the healthcare journey");

        cy.get('.counter .digit .number').each($num => {
            const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            expect(validNumbers).to.include($num.text());
        });
    });

    it('Should display the banner and validate buttons', () => {
        cy.get('section.get-started-patient-success .luma-banner-container').should('be.visible');
        cy.get('section.get-started-patient-success h3').should('contain.text', 'Get started with Luma');

        cy.get('section.get-started-patient-success .actions a').should('have.length', 2);

        checkButton('section.get-started-patient-success a.button.primary', 'Book a demo', 'https://www.lumahealth.io/book-a-demo');
        checkButton('section.get-started-patient-success a.button.outlined.secondary', 'Learn more about the platform', 'https://www.lumahealth.io/patient-success-platform');
    });

});

describe('Validate main elements from homePage - Low resolution', () => {

    const mainMenus = ['Platform', 'Who We Serve', 'Integrations', 'Learn', 'About us'];
    const footerTitles = [
        'Patient Success Platform',
        'Who We Serve',
        'Integrations',
        'Learn Hub',
        'Digital Health: On Air',
        'About Us',
        'Subscribe to our newsletter'
    ];
    const bottomFooterLinks = [
        { text: 'Terms of use', href: 'https://www.lumahealth.io/terms-of-use' },
        { text: 'Privacy policy', href: 'https://www.lumahealth.io/privacy-policy' },
        { text: 'System status', href: 'https://status.lumahealth.io/' },
        { text: 'Security and trust', href: 'https://www.lumahealth.io/security-and-trust' }
    ];
    const socialLinks = [
        { class: 'facebook', href: 'https://www.facebook.com/lumahealth' },
        { class: 'twitter', href: 'https://twitter.com/lumahealthhq' },
        { class: 'linkedin', href: 'https://www.linkedin.com/company/6403362' },
        { class: 'angellist', href: 'https://angel.co/luma-health' }
    ];

    const checkButton = (selector, text, href) => {
        cy.get(selector)
            .should('be.visible')
            .and('contain.text', text)
            .and('have.attr', 'href', href)
            .and('not.be.disabled');
    };

    beforeEach(() => {
        cy.start('low');
    });

    it('Should load homepage successfully', () => {
        cy.request('/').its('status').should('eq', 200);
    });

    it('Validate main header elements - tablet/mobile', () => {
        cy.get('a.navbar-logo img[alt="luma"]').should('be.visible');

        // abrir o menu hamburger
        cy.get('a.navbar-trigger').should('be.visible').click();

        // agora os links estão dentro do menu
        mainMenus.forEach(menu => {
            cy.contains('#navbar .main-menu-v2 > li a.hide-desktop', menu)
                .should('be.visible')
                .and('not.be.disabled');

        });
        cy.get('a.navbar-trigger').should('be.visible').click();

        // não validar Log in e Get a demo nesse layout
    });

    it('Validate hero section elements', () => {
        cy.get('.hero-text-container').should('be.visible');
        cy.get('.hero-section-title').should('contain.text', "Manual Tasks’ Worst Nightmare");
        cy.get('.hero-section-subtitle').should('contain.text', "Luma's AI-native Patient Success Platform™");

        cy.get('#heroVideo')
            .should('be.visible')
            .and($video => {
                expect($video).to.have.attr('src', 'https://www.lumahealth.io/wp-content/uploads/2025/01/MObile_674_3.mov');
                expect($video).to.have.prop('autoplay', true);
                expect($video).to.have.prop('muted', true);
                expect($video).to.have.prop('loop', true);
            });

        checkButton('.hero-button-group a[title="Build your demo"]', 'Build your demo', 'https://www.lumahealth.io/book-a-demo');
        checkButton('.hero-button-group a[title="See what it does"]', 'See what it does', 'https://www.lumahealth.io/patient-success-platform');
    });

    it('Should validate main footer titles', () => {
        footerTitles.forEach(title => {
            cy.contains('footer', title).should('be.visible');
        });
    });

    it('Should validate main bottom footer links', () => {
        bottomFooterLinks.forEach(link => {
            cy.contains('footer .left-content a', link.text)
                .should('be.visible')
                .and('have.attr', 'href', link.href);
        });
    });

    it('Should validate social media links', () => {
        socialLinks.forEach(link => {
            cy.get(`footer .social-menu a.${link.class}`)
                .should('be.visible')
                .and('have.attr', 'href', link.href);
        });
    });

    it('Should validate carousel is visible', () => {
        cy.get('section.top-logos .owl-carousel').should('be.visible');
    });

    it('Should validate "Learn more about Spark" button', () => {
        cy.get('.introduce-spark-bottom a')
            .should('be.visible')
            .and('have.attr', 'href', 'https://www.lumahealth.io/patient-success-platform/ai-spark/');
    });

    it('Verify if feedbacks carousel is displayed', () => {
        cy.get('.owl-carousel').should('be.visible');
        cy.get('.testimonial-wrapper').should('exist');
    });

    it('Should validate Workflow section links', () => {
        cy.get('.workflow-container a').each($link => {
            expect($link.prop('href')).to.include('lumahealth.io/patient-success-platform');
        });
    });

    it('Should render the patient counter correctly', () => {
        cy.get('.counter-container').should('be.visible');
        cy.get('.counter-title').should('contain.text', 'patients and counting');
        cy.get('.counter-subtitle').should('contain.text', "We're streamlining the healthcare journey");

        cy.get('.counter .digit .number').each($num => {
            const validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            expect(validNumbers).to.include($num.text());
        });
    });

    it('Should display the banner and validate buttons', () => {
        cy.get('section.get-started-patient-success .luma-banner-container').should('be.visible');
        cy.get('section.get-started-patient-success h3').should('contain.text', 'Get started with Luma');

        cy.get('section.get-started-patient-success .actions a').should('have.length', 2);

        checkButton('section.get-started-patient-success a.button.primary', 'Book a demo', 'https://www.lumahealth.io/book-a-demo');
        checkButton('section.get-started-patient-success a.button.outlined.secondary', 'Learn more about the platform', 'https://www.lumahealth.io/patient-success-platform');
    });

});
