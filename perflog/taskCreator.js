const commandTimings = {};

let runningTest;
let testEndTime;
let aTestEnded = false;

const shouldIgnore = cmd => !['visit', 'url'].includes(cmd.attributes.name);

const commandStarted = cmd => {
  if (!shouldIgnore(cmd)) {
    if (!aTestEnded) {
      cy.task('setRunningTest', runningTest);
    } else if (aTestEnded) {
      cy.task('testEnded', testEndTime);
      aTestEnded = false;
      testEndTime = null;
    }

    const { chainerId } = cmd.attributes;
    commandTimings[chainerId] = { start: performance.now() };
  }
};

const commandEnded = cmd => {
  if (shouldIgnore(cmd)) return;

  const { chainerId, name, args } = cmd.attributes;
  if (commandTimings[chainerId]) {
    const timeToRun = performance.now() - commandTimings[chainerId].start;
    cy.task('addCommandLog', { name, args, timeToRun });
  }
};

const testStarted = test => {
  runningTest = {
    title: test.title,
    startTime: performance.now()
  };
};

const testEnded = () => {
  aTestEnded = true;
  testEndTime = performance.now();
};

module.exports = { commandStarted, commandEnded, testStarted, testEnded };
