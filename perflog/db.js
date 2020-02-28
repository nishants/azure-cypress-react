const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { ensurePathExists } = require('./utils/fileHelper');

const EMPTY_DATA = { commands: [], tests: [] };
let db;

const initialize = performLogsFilePath => {
  ensurePathExists(performLogsFilePath);
  const adapter = new FileSync(performLogsFilePath);
  db = low(adapter);
  db.defaults(EMPTY_DATA).write();
};

module.exports = {
  initialize,
  addCommand: commandData =>
    db
      .get('commands')
      .push(commandData)
      .write(),
  addTest: testData =>
    db
      .get('tests')
      .push(testData)
      .write()
};
