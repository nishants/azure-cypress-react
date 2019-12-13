/* eslint-disable no-console */
// eslint-disable-next-line global-require
const database = () => require('./db');

let disabled = false;

const taskHandlers = {
  performanceLog(log) {
    if (disabled) return null;
    console.log(JSON.stringify(log));
    database().addCommand(log);
    return null;
  },
  setTestRunTime(info) {
    if (disabled) return null;
    console.log('test finished', JSON.stringify(info));
    database().addTest(info);
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
  database().initialize(output);
};

module.exports = {
  enable,
  taskHandlers
};
