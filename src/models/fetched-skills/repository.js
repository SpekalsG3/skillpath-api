const { FetchedSkills, Skills } = require('../index').models;

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
}

module.exports = new FetchedSkillsRepository();
