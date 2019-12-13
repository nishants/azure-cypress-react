/* eslint-disable no-console */

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

const taskHandlers = {
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
};

module.exports = {
  load: () => {
    console.log('******************************');
    console.log('loading buddy..be happy');
    console.log('******************************');
  },

  getTasksHandlers: () => taskHandlers,
  getHooks: () => ({})
};
