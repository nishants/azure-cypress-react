// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const performanceLogs = {
  commands: [],
  tests: []
};

const performLogsFilePath = './performanceLogs.json';

const syncPerformanceLogs = () => {
  // eslint-disable-next-line no-console,global-require
  require('fs').writeFile(
    performLogsFilePath,
    JSON.stringify(performanceLogs),
    'utf8',
    // eslint-disable-next-line no-console
    error => error && console.error('Faild to write performance logs', error)
  );
};

module.exports = (on /* ,config */) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    performanceLog(message) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(message));
      performanceLogs.commands.push(message);
      return null;
    },
    setTestRunTime(info) {
      performanceLogs.tests.push(info);
      // eslint-disable-next-line no-console
      console.log('test finished', JSON.stringify(info));
      syncPerformanceLogs();
      return null;
    }
  });
};
