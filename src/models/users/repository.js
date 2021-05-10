const { Users } = require('../index').models;

class SkillsRepository {
  async findByUsername ({ username }) {
    return await Users.findOne({
      where: {
        username,
      },
      raw: true,
      returning: true,
    });
  }

  async createNew ({ username, email, password }) {
    await Users.create({
      username,
      email,
      password,
    });
  }
}

module.exports = new SkillsRepository();
