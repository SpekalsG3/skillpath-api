const { FetchedSkills, SkillAssociations } = require('../index').models;

class FetchedSkillsRepository {
  async findAll () {
    return await FetchedSkills.findAll({
      raw: true,
      returning: true,
    });
  }
}

module.exports = new FetchedSkillsRepository();
