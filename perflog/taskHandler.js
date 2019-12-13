/* eslint-disable no-console */

const performanceLogs = {
  commands: [],
  tests: []
};

let db;

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
    db.get('tests')
      .push(info)
      .write();
    return null;
  }
};
const load = () => {
  const performLogsFilePath = './performanceLogs.json';

  // eslint-disable-next-line global-require
  const low = require('lowdb');
  // eslint-disable-next-line global-require
  const FileSync = require('lowdb/adapters/FileSync');

  const adapter = new FileSync(performLogsFilePath);
  db = low(adapter);
  // Set some defaults (required if your JSON file is empty)
  db.defaults({
    commands: [],
    tests: []
  }).write();
};

module.exports = {
  load,
  taskHandlers
};
