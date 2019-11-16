**To setup basic pipleine : [here](./01-setup-react-website.md)**

### Adding Cypress tests to CI/CD pipeline

In this step, we will setup cypress tests for the project. As part of this we will

- setup cypress tests for a new project
- add cypress tests to the build
- if cypress tests fail, auto deploy to QA env will not happen
- If cypress tests fail, the code cannot be released to production

### Setup Cypress

- Clone repo from here : https://github.com/nishants/react-static-website

- install cypress

  ```bash
  npm install cypress --save-dev
  ```

- open `package.json` and add a script

  ```yaml
    "scripts": {
      "cypress:open": "cypress open",
  ```

- now run command

  ```
  npm run cypress:open
  ```

- Cypress will open UI, with some tests

  ![cypress-open-first-time](/Users/dawn/Desktop/cypress-open-first-time.gif)

* These are the example tests that were creted when we installed the cypress
* Notice that there is a `cyrpess.json` and `cypress` dir created at our project root automatically.
* `cypress/integration/examples` contains the example tests, lets delete this directory
* Add all your files to git and commit.

### Write a Cypress test

-
