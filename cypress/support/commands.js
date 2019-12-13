const { events } = require('perflog');

Cypress.on('command:start', events.commandStarted);
Cypress.on('command:end', events.commandEnded);
Cypress.on('test:before:run', events.testStarted);
Cypress.on('test:after:run', events.testEnded);
