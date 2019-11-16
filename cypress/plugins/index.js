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

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(performLogsFilePath);
const db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({
  commands: [],
  tests: []
}).write();

module.exports = (on /* ,config */) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    performanceLog(log) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(log));
      // Add a post
      db.get('commands')
        .push(log)
        .write();

      return null;
    },
    setTestRunTime(info) {
      performanceLogs.tests.push(info);
      // eslint-disable-next-line no-console
      console.log('test finished', JSON.stringify(info));
      db.get('commands')
        .push(info)
        .write();
      return null;
    }
  });
};
