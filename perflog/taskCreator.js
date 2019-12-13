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

const testPath = runner => {
  const path = [];
  let node = runner;
  while (node) {
    path.push(node.title);
    node = node.parent;
  }
  path.push(Cypress.spec.name);

  return path.reverse().join('/');
};

const testStarted = (/* test */) => {
  runningTest = {
    title: testPath(Cypress.mocha.getRunner().currentRunnable),
    startTime: performance.now()
  };
};

const testEnded = () => {
  aTestEnded = true;
  testEndTime = performance.now();
};

module.exports = { commandStarted, commandEnded, testStarted, testEnded };
