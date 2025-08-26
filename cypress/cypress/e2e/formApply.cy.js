const viewports = [
  { name: 'high res', device: 'macbook-16' },
  { name: 'med res', device: 'ipad-2' },
  { name: 'low res', device: 'iphone-8' },
];

const requiredFields = [
  { name: 'firstname', label: 'First Name' },
  { name: 'lastname', label: 'Last Name' },
  { name: 'email', label: 'Work Email' },
  { name: 'phone', label: 'Phone number' },
  { name: 'organization_name', label: 'Organization Name' },
  { name: 'provider_range', label: 'Provider Range' },
  { name: 'organization_type', label: 'Organization Type' },
  { name: 'ehr', label: 'EHR' },
  { name: 'what_are_you_interested_in_', label: 'What are you interested in?' },
  { name: 'how_d_you_hear_about_us_', label: 'How did you first hear about us?' }
];

describe('Book a Demo Form - Visibility & Required fields', () => {
  viewports.forEach((vp) => {

    context(`Viewport: ${vp.name}`, () => {

      beforeEach(() => {
        cy.on('uncaught:exception', () => false);
        cy.viewport(vp.device);
        cy.visit('https://go.lumahealth.io/book-a-demo-embed', { 
          timeout: 120000,
          failOnStatusCode: false 
        });
      });

      it('should display all fields and submit button', () => {
        // Form principal
        cy.get('form#hsForm_1f361297-a9ef-40fd-8c4c-b77e3984adc2_8263').should('exist');

        // Campos de texto
        ['firstname','lastname','email','phone','organization_name'].forEach(name => {
          cy.get(`input[name="${name}"]`).should('be.visible');
        });

        // Selects
        ['provider_range','organization_type','ehr'].forEach(name => {
          cy.get(`select[name="${name}"]`).should('be.visible');
        });

        // Textareas
        ['what_are_you_interested_in_','how_d_you_hear_about_us_'].forEach(name => {
          cy.get(`textarea[name="${name}"]`).should('be.visible');
        });

        // Submit
        cy.get('input[type="submit"]').should('be.visible');
      });

      it('should show validation messages when required fields are empty', () => {
        // Submete sem preencher nada
        cy.get('input[type="submit"]').click();

        // Valida mensagens de erro
        requiredFields.forEach(field => {
          cy.get(`[name="${field.name}"]`)
            .parents('.hs-form-field')
            .find('.hs-error-msgs, .hs-form-required')
            .should('be.visible');
        });
      });

    });
  });
});

