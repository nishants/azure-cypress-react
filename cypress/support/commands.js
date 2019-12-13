const timings = {};
const shouldIgnore = cmd => !['visit', 'url'].includes(cmd.attributes.name);
let lastTestTime;
const testTime = {
  title: null,
  time: 0
};

let shouldSaveTestTime = false;

Cypress.on('command:start', cmd => {
  if (shouldIgnore(cmd)) return;
  if (shouldSaveTestTime) {
    cy.task('setTestRunTime', { testTime: lastTestTime });
    lastTestTime = null;
  }
  const { chainerId } = cmd.attributes;
  timings[chainerId] = { start: performance.now() };
});

Cypress.on('command:end', cmd => {
  if (shouldIgnore(cmd)) return;

  const { chainerId, name, args } = cmd.attributes;
  if (timings[chainerId]) {
    const timeToRun = performance.now() - timings[chainerId].start;
    cy.task('performanceLog', { name, args, timeToRun });
  }
});

Cypress.on('test:before:run', test => {
  testTime.title = test.title;
  testTime.time = performance.now();
});

Cypress.on('test:after:run', () => {
  testTime.time = performance.now() - testTime.time;
  // eslint-disable-next-line no-console
  console.log(testTime);
  shouldSaveTestTime = true;
  lastTestTime = { ...testTime };
});
