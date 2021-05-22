const { Users, UserPreferences } = require('../index').models;

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

  async findPreference ({ skillId, userId }) {
    return await UserPreferences.findOne({
      where: {
        user_id: userId,
        skill_id: skillId,
      },
      raw: true,
      return: true,
    });
  }

  async addPreference ({ skillId, userId }) {
    await UserPreferences.create({
      user_id: userId,
      skill_id: skillId,
    });
  }

  async deletePreference ({ preferenceId }) {
    await UserPreferences.destroy({
      where: {
        id: preferenceId,
      },
    });
  }

  async findAllUserPreferences ({ userId }) {
    return await UserPreferences.findAll({
      where: {
        user_id: userId,
      },
      raw: true,
      returning: true,
    });
  }
}

module.exports = new SkillsRepository();
