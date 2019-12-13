[![Build Status](https://dev.azure.com/SaxoUniversity/azure-cypress-react/_apis/build/status/nishants.azure-cypress-react?branchName=master)](https://dev.azure.com/SaxoUniversity/azure-cypress-react/_build/latest?definitionId=6&branchName=master)
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
      "cy:run": "cypress run",
      ....
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

- create a file `cypress/integration/homepage_spec.js`

  ```js
  describe('Homepage', () => {
    it('Check if page loads', () => {
      cy.visit('http://localhost:3000/');
      cy.url().should('include', '#/portfolio');
    });
  });
  ```

- Run test in **headless mode** (wihout opening a browser UI)

  ```
  npm run cypress:run
  ```

## Preparing run script for ci

- In ci if we run a command the build waits for the command to finish.

- We need to accomplish

  - run node node server
  - run cypress tests
  - after tests have finished, stop node server and exit

- to accomplish this, we will use `npm-run-all` node module

  ```
  npm install npm-run-all --save
  ```

* we will use following command :

  ```bash
  npm-run-all -p --race start cypress:run
  ```

  this command will :

  - execute `npm start`
  - execute `cypress:run`
  - and stop node server when cypress tests have finished

* Now lets add a cypress command that can start the node server and run tests

  ```json
    "scripts": {
      "cypress:open": "cypress open",
      "cypress:run": "cypress run",
      "cypress:ci": "npm-run-all -p --race start cypress:run",
  ```

* Now add a build step to ``

  ```yaml
  - script: npm run cypress:ci
    displayName: 'Running cypress tests'
  ```

* So our file looks like

* ```yaml
  # This sets trigger to any update in master
  # trigger:
  # - master

  #  Defines the host for agent (MS hosted)
  pool:
    vmImage: 'ubuntu-latest'

  #  Build steps for the pipeline
  steps:
    - script: npm ci
      displayName: 'Installing node modules'

    - script: npm run lint
      displayName: 'Checking for lint errors'

    - script: npm run build
      displayName: 'Running webpack build'

    - script: npm run cypress:ci
      displayName: 'Running cypress tests'

    # Save artifacts to refer them in release builds
    - task: PublishPipelineArtifact@1
      inputs:
        path: $(Agent.BuildDirectory)/s/build
        artifact: react-static-website-build-artifacts
  ```
