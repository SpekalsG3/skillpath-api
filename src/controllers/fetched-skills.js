const FetchedSkillsRepository = require('../models/fetched-skills/repository');

class FetchedSkillsController {
  async getFetchedSkills (ctx) {
    const fetchedSkills = await FetchedSkillsRepository.findAll();
    console.log(`got fetched skills: ${fetchedSkills.length}`);
    ctx.ok({
      result: true,
      response: fetchedSkills,
    });
  }
}

module.exports = new FetchedSkillsController();
