Test Plan: Mini Fullstack App
Author: Stefan Stoiljkovic
Date: [July 26, 2025]
Version: 1.0

1. Objective
The objective of this test plan is to validate the essential functionality of a fullstack application (React frontend + Node.js backend) through automated tests that ensure:

Correct operation of the user interface (UI)

Functional API behavior (CRUD operations)


2. Scope of Testing
UI Tests (Executed with Playwright)
Login form with valid and invalid credentials

Creating a new item (e.g., a todo item)

Editing an existing item

Deleting an item

Verifying that data is correctly displayed (e.g., item count)

API Tests (Executed with Playwright)
POST /login – successful and unsuccessful login

GET /items – fetching all items

POST /items – creating a new item

PUT /items/:id – updating an existing item

DELETE /items/:id – deleting an item

All API tests are implemented and executed using the Playwright test framework via APIRequestContext.

3. Tools and Technologies
Test Type	Tool	Purpose
UI & API	Playwright	Unified framework for both UI and API testing
CI/CD	GitHub Actions	Easy integration and automation in CI pipeline

4. Execution Strategy
All tests (UI and API) are executed automatically via GitHub Actions upon each push or pull request to the main branch.

Backend and frontend servers are started in the CI environment prior to test execution.

Playwright handles both UI interaction and API validation from a centralized test suite.
