require('dotenv').config();

const Koa = require('koa');
const Helmet = require('koa-helmet');
const BodyParser = require('koa-bodyparser');
const Cors = require('@koa/cors');
const respond = require('koa-respond');

const router = require('./router');
const Logger = require('./utils/logger');
const errorBuilder = require('./utils/error-builder');

const globalLogger = new Logger('API');

const app = new Koa();
app.proxy = true;

app.use(Helmet());

app.use(Cors({
  origin: '*',
  allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
}));

app.use(BodyParser({
  onerror (err, ctx) {
    ctx.throw('body parse error', 422);
  },
}));

function handleError (error, ctx) {
  const internalError = errorBuilder.buildInternalServerError();

  if (!error.statusCode || error.statusCode === internalError.statusCode) {
    globalLogger.error('Error occurred!', error);
  }

  ctx.status = error.statusCode || internalError.statusCode;
  ctx.body = {
    result: false,
    message: error.message,
    code: error.code || internalError.code,
  };
}

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    handleError(error, ctx);
  }
});

app.use(respond());

// API routes
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 5004;
// eslint-disable-next-line no-console
app.listen(port, () => globalLogger.info(`API server started on ${port}`));
