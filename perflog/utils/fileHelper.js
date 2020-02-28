const fse = require('fs-extra');

const ensurePathExists = path => fse.outputFileSync(path, '');

module.exports = { ensurePathExists };
