const jwt = require('jsonwebtoken');
const config = require('../config');

const signJwtToken = (data) => jwt.sign(data, config.encoding.jwtSecret, { expiresIn: config.encoding.jwtExpirePeriod });
const verifyJwtToken = (token) => Boolean(jwt.verify(token, config.encoding.jwtSecret));
const getJwtTokenData = (token) => jwt.verify(token, config.encoding.jwtSecret);

module.exports = {
  signJwtToken,
  verifyJwtToken,
  getJwtTokenData,
};
