const errorBuilder = require('../utils/error-builder');

module.exports = async function verifyApiKey (ctx, next) {
  const apiKey = ctx.headers['x-api-key'];

  if (!apiKey) {
    throw errorBuilder.buildInvalidTokenError();
  }

  await next();
};
