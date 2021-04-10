const SpecializationsRepository = require('../models/specializations/repository');
const specializationsDto = require('./dtos/specializations');

class SpecializationsController {
  async getSpecializations (ctx) {
    const specializations = await SpecializationsRepository.findAll();

    ctx.ok({
      result: true,
      response: specializations.map(specializationsDto),
    });
  }
}

module.exports = new SpecializationsController();
