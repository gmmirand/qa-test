# QA-Test

This project is an **end-to-end (E2E) automated testing framework**, implemented with [Cypress](https://www.cypress.io/) to validate user experience, accessibility, and the integrity of the main flows of the [Luma Health](https://www.lumahealth.io/) website. The goal is to ensure that critical functionalities are accessible and correct across different devices and resolutions, covering various site scenarios and components.

---

## Table of Contents

* [About the Project](#about-the-project)
* [Test Structure](#test-structure)
* [How to Run](#how-to-run)
* [Setup and Installation](#setup-and-installation)
* [Adopted Best Practices](#adopted-best-practices)
* [Assumptions and Limitations](#assumptions-and-limitations)
* [References](#references)

---

## About the Project

The repository contains **Cypress automated tests** to validate the following main points:

* Navigation of main menus, header, and footer.
* Validation of buttons, links, and page navigation.
* Responsiveness testing across multiple resolutions (desktop, tablet, mobile).
* Form testing: required fields, error messages, and submission.
* Validation of dynamic content, carousels, workflow sections, and error pages (404).
* Verification of iframe integrity, HTTP status of external pages, and resources.

---

## Test Structure

The structure follows Cypress conventions:

```
cypress/
 ├── e2e/
 │    ├── homepageAccess.cy.js
 │    ├── homeValidation.cy.js
 │    ├── linksHeader.cy.js
 │    ├── linksHero.cy.js
 │    ├── linksSpark.cy.js
 │    ├── formApply.cy.js
 │    └── pageWrong.cy.js
 ├── support/
 │    └── commands.js
 ├── pages/
 │    └── HomePage.js
 └── cypress.config.js
```

* **Custom commands** (`support/commands.js`): abstract viewport, navigation, and recurring element validations.
* **Cypress configuration** (`cypress.config.js`): defines baseUrl, report directory, default resolution, etc.
* **Tests organized by flow**: each file covers a specific aspect of the site (e.g., menu navigation, forms, hero links, 404 page).

---

## How to Run

1. **Prerequisites**

   * Node.js >= 16.x
   * npm/yarn installed

2. **Installation**

   ```bash
   git clone https://github.com/gmmirand/qa-test.git
   cd qa-test
   npm install
   ```

3. **Running the tests**

   * Headless mode (with reports):

     ```bash
     npx cypress run
     ```
   * Interactive mode:

     ```bash
     npx cypress open
     ```

4. **Reports**

   * HTML and JSON reports will be generated in `cypress/reports` (using the Mochawesome reporter).

---

## Adopted Best Practices

* **Modular test organization**: each flow/test is in a separate file.
* **Custom commands** to simplify maintenance and reuse logic.
* **Validation across different resolutions** to ensure responsiveness.
* **Use of robust selectors** (classes, IDs, texts).
* **Exception handling** to avoid false negatives.
* **HTTP status verification** of pages and iframes.
* **Detailed reports** for execution analysis.

---

## Assumptions and Limitations

* The baseUrl is set to `https://www.lumahealth.io/`, but it can be changed according to the environment/test.
* Tests assume the site is available and responsive for the simulated devices.
* Fields, buttons, and links must keep the current classes and structure for commands to work correctly.
* Internet access is required to run the full test suite, no locals test were done.

---

## References

* [Cypress Documentation](https://docs.cypress.io/)
* [Mochawesome Reporter](https://www.npmjs.com/package/mochawesome)
* [Luma Health Website](https://www.lumahealth.io/)

---

**Author:** [gmmirand](https://github.com/gmmirand)
