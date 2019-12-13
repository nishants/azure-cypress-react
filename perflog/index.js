const { taskHandlers, enable } = require('./taskHandler');
const taskCreators = require('./taskCreator');

module.exports = {
  enable,
  getTasksHandlers: () => taskHandlers,
  events: taskCreators
};
