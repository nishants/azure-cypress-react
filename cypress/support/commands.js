/* eslint-disable no-undef,no-console */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const timings = {};
const shouldIgnore = cmd => !['visit', 'url'].includes(cmd.attributes.name);

Cypress.on('command:start', cmd => {
  if (shouldIgnore(cmd)) return;
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
