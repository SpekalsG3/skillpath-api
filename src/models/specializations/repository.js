const { Specializations } = require('../index').models;

class SpecializationRepository {
  async findAll () {
    return await Specializations.findAll({
      raw: true,
      returning: true,
    });
  }

  async findByTitle ({ title }) {
    return await Specializations.findOne({
      where: {
        title,
      },
      raw: true,
      returning: true,
    });
  }
}

module.exports = new SpecializationRepository();
