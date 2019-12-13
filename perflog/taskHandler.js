// eslint-disable-next-line global-require
const database = () => require('./db');

let disabled = false;
let currentTest;

const setRunningTest = test => {
  currentTest = test;
  return null;
};

const testEnded = timeEnded => {
  if (disabled) return null;
  if (!currentTest) return null; // when first command runs before no test are there to save

  database().addTest({
    title: currentTest.title,
    time: timeEnded - currentTest.startTime
  });

  currentTest = null;
  return null;
};

const addCommandLog = log => {
  if (disabled) return null;
  database().addCommand(log);
  return null;
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
  taskHandlers: {
    setRunningTest,
    testEnded,
    addCommandLog
  }
};
