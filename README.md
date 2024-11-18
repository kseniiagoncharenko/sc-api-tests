# API Tests with Playwright

## Prerequisites:
	- Node.js 18 or higher
	- VS Code or any other IDE/terminal

This project contains API tests created using Playwright and TypeScript.
Tests cover different possible requests types such as GET, POST, PATCH, DELETE using the API functionality available at [https://reqres.in].

## Tests:
1. Verify that registration of undefined users is not possible: verify that users who are not yet defined on [https://reqres.in] shouldn't be able to register.
2. Get a defined user, register defined user, login and logout: retrieve random users's data from [https://reqres.in], ensure that existing user can successfully register and it is possible to create and end a session for them via API.
3. Patch and delete existing defined user: ensure that PATCH request returns the edited value in response and that DELETE request is successful.

## To run public API tests using Playwright:
1. Clone this repository to your machine.
2. Open folder with tests (api-tests) in IDE/terminal. 
3. Install all required dependencies from package.json file, before running the tests for the first time. 
This can be done using the next command:<br>
	**npm install**<br>
4. To run all tests use command<br>
	**npx playwright test**<br>
5. To view the tests results with the built-in Playwright report viewer run<br>
    **npx playwright show-report**<br>
