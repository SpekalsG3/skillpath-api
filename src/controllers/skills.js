const SkillsRepository = require('../models/skills/repository');
const specializationForSkills = require('./dtos/specializations-for-skills');

class SkillsController {
  async getSpecializationsForSkills (ctx) {
    const skills = await SkillsRepository.findSpecializationForAllSkills();

    const response = skills.reduce((total, skill) => {
      const dtoSkill = specializationForSkills(skill);
      if (total[dtoSkill.id]) {
        total[dtoSkill.id].specializations.push(dtoSkill.specializations[0]);
      } else {
        total[dtoSkill.id] = dtoSkill;
      }
      return total;
    }, {});

    ctx.ok({
      result: true,
      response: response,
    });
  }
}

module.exports = new SkillsController();
