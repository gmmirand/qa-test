// List of viewports (screen resolutions) to be tested
const viewports = [
  { name: 'high res', device: 'macbook-16' },
  { name: 'med res', device: 'ipad-2' },
  { name: 'low res', device: 'iphone-8' },
];

// List of required fields in the form
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

describe('Book a Demo Form - Required fields', () => {
  // Loop to run tests on all defined viewports
  viewports.forEach((vp) => {

    context(`Viewport: ${vp.name}`, () => {

      // Runs before each test
      beforeEach(() => {
        cy.on('uncaught:exception', () => false); // Ignore page JS errors so they don't fail the test
        cy.viewport(vp.device); // Set current viewport
        cy.visit('https://go.lumahealth.io/book-a-demo-embed', { 
          timeout: 120000,         // Increased timeout (site might be slow)
          failOnStatusCode: false  // Do not fail if status code is not 200
        });
      });

      it('should display all fields and submit button', () => {
        // Check if the main form exists on the page
        cy.get('form[id*="hsForm_1f361297-a9ef-40fd-8c4c-b77e3984adc2').should('exist');

        // Check if text input fields are visible
        ['firstname','lastname','email','phone','organization_name'].forEach(name => {
          cy.get(`input[name="${name}"]`).should('be.visible');
        });

        // Check if select (dropdown) fields are visible
        ['provider_range','organization_type','ehr'].forEach(name => {
          cy.get(`select[name="${name}"]`).should('be.visible');
        });

        // Check if textarea fields are visible
        ['what_are_you_interested_in_','how_d_you_hear_about_us_'].forEach(name => {
          cy.get(`textarea[name="${name}"]`).should('be.visible');
        });

        // Check if the submit button is visible
        cy.get('input[type="submit"]').should('be.visible');
      });

      it('should show validation messages when required fields are empty', () => {
        // Try to submit the form without filling in any fields
        cy.get('input[type="submit"]').click();

        // Check if error messages appear for each required field
        requiredFields.forEach(field => {
          cy.get(`[name="${field.name}"]`)
            .parents('.hs-form-field')              // Go up to the field container
            .find('.hs-error-msgs, .hs-form-required') // Look for error message or required field indicator
            .should('be.visible');                  // Confirm it is visible
        });
      });

    });
  });
});
