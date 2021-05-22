const { FetchedSkills, Skills, SkillAssociations } = require('../index').models;

class FetchedSkillsRepository {
  async findAll ({ order, orderby }) {
    const query = {
      include: Skills,
      raw: true,
      returning: true,
    };

    const columns = await FetchedSkills.describe();

    if (orderby && Object.keys(columns).includes(orderby)) {
      query.order = [[
        orderby,
        order.toLowerCase() === 'desc' ? 'DESC' : 'ASC',
      ]];
    }

    return await FetchedSkills.findAll(query);
  }

  async findAllAssociations () {
    return await SkillAssociations.findAll({
      raw: true,
      returning: true,
    });
  }

  async findAllAssociationsForSkill ({ skillId }) {
    return await SkillAssociations.findAll({
      where: {
        first_skill_id: skillId,
      },
      raw: true,
      returning: true,
    });
  }
}

module.exports = new FetchedSkillsRepository();
