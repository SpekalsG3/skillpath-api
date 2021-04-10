const FetchedSkillsRepository = require('../models/fetched-skills/repository');
const fetchedSkillToDto = require('./dtos/fetched-skill');

class FetchedSkillsController {
  async getFetchedSkills (ctx) {
    const fetchedSkills = await FetchedSkillsRepository.findAll(ctx.request.query);

    ctx.ok({
      result: true,
      response: fetchedSkills.map(fetchedSkillToDto),
    });
  }
}

module.exports = new FetchedSkillsController();
