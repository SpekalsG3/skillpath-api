const crypto = require('crypto');
const config = require('../config');

function isNumeric (str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function sha256 (str) {
  return crypto
    .createHmac('sha256', config.encoding.shaSecret)
    .update(str)
    .digest('hex');
}

module.exports = {
  isNumeric,
  sha256,
};
