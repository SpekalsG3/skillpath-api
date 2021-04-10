const Router = require('koa-router');

const errorBuilder = require('./utils/error-builder');
const FetchedSkillsController = require('./controllers/fetched-skills');
const SkillsController = require('./controllers/skills');
const SpecializationsController = require('./controllers/specializations');

const {
  apiKeyVerification,
} = require('./middlewares');

const router = new Router({ prefix: '/v1' });

router.get('/status', (ctx) => { ctx.ok({ result: true, response: 'OK' }); });

router.get('/parsed-skills', apiKeyVerification, FetchedSkillsController.getFetchedSkills);
router.get('/specializations', apiKeyVerification, SpecializationsController.getSpecializations);
router.get('/specializations/for-skills', apiKeyVerification, SkillsController.getSpecializationsForSkills);

router.all('(.*)', () => {
  throw errorBuilder.buildNotFoundError();
});

module.exports = router;
