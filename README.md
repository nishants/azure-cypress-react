

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

- 