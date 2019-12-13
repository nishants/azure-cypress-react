const { taskHandlers, load } = require('./taskHandler');
const taskCreators = require('./taskCreator');

module.exports = {
  load,
  getTasksHandlers: () => taskHandlers,
  events: taskCreators
};
