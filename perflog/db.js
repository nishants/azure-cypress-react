const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { ensurePathExists } = require('./utils/fileHelper');

let db;
const EMPTY_DATA = {
  commands: [],
  tests: []
};

const initialize = performLogsFilePath => {
  ensurePathExists(performLogsFilePath);
  const adapter = new FileSync(performLogsFilePath);
  db = low(adapter);
  db.defaults(EMPTY_DATA).write();
};

module.exports = {
  initialize,
  addCommand: log =>
    db
      .get('commands')
      .push(log)
      .write(),
  addTest: log =>
    db
      .get('tests')
      .push(log)
      .write()
};
