const timings = {};
const shouldIgnore = cmd => !['visit', 'url'].includes(cmd.attributes.name);
let lastTestTime;
const testTime = {
  title: null,
  time: 0
};

let shouldSaveTestTime = false;

const commandStarted = cmd => {
  if (shouldIgnore(cmd)) return;
  if (shouldSaveTestTime) {
    cy.task('setTestRunTime', { testTime: lastTestTime });
    lastTestTime = null;
  }
  const { chainerId } = cmd.attributes;
  timings[chainerId] = { start: performance.now() };
};

const commandEnded = cmd => {
  if (shouldIgnore(cmd)) return;

  const { chainerId, name, args } = cmd.attributes;
  if (timings[chainerId]) {
    const timeToRun = performance.now() - timings[chainerId].start;
    cy.task('performanceLog', { name, args, timeToRun });
  }
};

const testStarted = test => {
  testTime.title = test.title;
  testTime.time = performance.now();
};

const testEnded = () => {
  testTime.time = performance.now() - testTime.time;
  // eslint-disable-next-line no-console
  console.log(testTime);
  shouldSaveTestTime = true;
  lastTestTime = { ...testTime };
};

module.exports = { commandStarted, commandEnded, testStarted, testEnded };
