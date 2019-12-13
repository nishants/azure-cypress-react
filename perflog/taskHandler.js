/* eslint-disable no-console */

let db;
let disabled = false;
const performanceLogs = {
  commands: [],
  tests: []
};

const taskHandlers = {
  performanceLog(log) {
    if (disabled) return null;
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(log));
    // Add a post
    db.get('commands')
      .push(log)
      .write();

    return null;
  },
  setTestRunTime(info) {
    if (disabled) return null;
    performanceLogs.tests.push(info);
    // eslint-disable-next-line no-console
    console.log('test finished', JSON.stringify(info));
    db.get('tests')
      .push(info)
      .write();
    return null;
  }
};
const enable = ({
  output = './performanceLogs.json',
  enabled = process.env.perflog
}) => {
  if (!enabled) {
    disabled = true;
    return;
  }

  const performLogsFilePath = output;
  // eslint-disable-next-line global-require
  const { ensurePathExists } = require('./utils/fileHelper');
  ensurePathExists(performLogsFilePath);

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
  enable,
  taskHandlers
};
