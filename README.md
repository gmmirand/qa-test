---

# QA-Test

This project is an **end-to-end (E2E) automated testing framework** built with [Cypress](https://www.cypress.io/) and structured using the **Mocha test runner syntax**. It validates the user experience, accessibility, and integrity of the main flows of the [Luma Health](https://www.lumahealth.io/) website.

Tests can be executed **locally** or automatically via **CI/CD pipelines**, ensuring that critical functionalities are continuously verified across multiple devices and resolutions.

---

## Test Results

<img width="756" height="474" alt="Screenshot 2025-08-26 at 22 29 33" src="https://github.com/user-attachments/assets/b0b23254-5b7e-4271-bd09-1316aa0d22bf" />


**Results with Mocha**


<img width="1145" height="504" alt="image" src="https://github.com/user-attachments/assets/5782af7d-bac7-47e6-81bf-cdf254f7b721" />


---

## Table of Contents

* [About the Project](#about-the-project)
* [Test Structure](#test-structure)
* [How to Run](#how-to-run)
* [CI/CD Integration](#cicd-integration)
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

With the integration of **CI/CD** and **Mocha**, tests can now run automatically on every pull request or push to the main branch, generating detailed reports and ensuring high confidence in the site's stability.

---

## Test Structure

The structure follows Cypress conventions and **Mocha test runner syntax**:

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

* **Custom commands** (support/commands.js): abstract viewport, navigation, and recurring element validations.
* **Cypress configuration** (cypress.config.js): defines baseUrl, report directory, default resolution, etc.
* **Tests organized by flow**: each file covers a specific aspect of the site (e.g., menu navigation, forms, hero links, 404 page).
* **Mocha structure**:

  * `describe` blocks group related tests.
  * `it` blocks define individual test cases.
  * Hooks (`before`, `afterEach`, etc.) manage setup and teardown.

---

## How to Run

### Prerequisites

* Node.js >= 16.x
* npm or yarn installed

### Installation

```bash
git clone https://github.com/gmmirand/qa-test.git
cd qa-test
npm install
```

### Running the tests

* **Headless mode (with reports)**:

```bash
npx cypress run --reporter mochawesome
```

* **Interactive mode**:

```bash
npx cypress open
```

### Reports

* HTML and JSON reports are generated in `cypress/reports` (using [Mochawesome](https://www.npmjs.com/package/mochawesome)).

---

## CI/CD Integration

* Tests are automatically executed on every pull request or push to the main branch.
* Example workflow (GitHub Actions): `.github/workflows/cypress.yml`.
* Failing tests can block merges if branch protection rules are configured.
* Reports (HTML/JSON) are generated and accessible after the workflow completes.
* Integration ensures early detection of regressions and continuous validation of critical flows.

---

## Adopted Best Practices

* **Modular test organization**: each flow/test is in a separate file.
* **Custom commands** to simplify maintenance and reuse logic.
* **Validation across different resolutions** to ensure responsiveness.
* **Use of robust selectors** (classes, IDs, texts).
* **Exception handling** to avoid false negatives.
* **HTTP status verification** of pages and iframes.
* **Detailed reports** for execution analysis.
* **Continuous Integration/Delivery (CI/CD)**: automated execution on PRs/merges.
* **Mocha test runner**: provides structured, readable, and maintainable test definitions with hooks and grouping.

---

## Assumptions and Limitations

* The `baseUrl` is set to `https://www.lumahealth.io/`, but it can be changed according to the environment/test.
* Tests assume the site is available and responsive for the simulated devices.
* Fields, buttons, and links must keep the current classes and structure for commands to work correctly.
* Internet access is required to run the full test suite; no local-only tests were done.

---

## References

* [Cypress Documentation](https://docs.cypress.io/)
* [Mochawesome Reporter](https://www.npmjs.com/package/mochawesome)
* [Luma Health Website](https://www.lumahealth.io/)

---

**Author:** [gmmirand](https://github.com/gmmirand)

---
