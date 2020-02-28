const { taskHandlers, enable } = require('./taskHandler');
const taskCreators = require('./taskCreator');

module.exports = {
  enable,
  getTasksHandlers: () => taskHandlers,
  events: taskCreators,
  flush: () => taskHandlers.testEnded(Date.now()) // workaround to capture last test time in a suite
};
