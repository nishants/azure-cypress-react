const perflog = require('perflog');

perflog.enable({
  output: './build/logs/perfLog.json',
  enabled: process.env.perflog
});

module.exports = (on /* ,config */) => {
  on('task', { ...perflog.getTasksHandlers() });
};
