const FetchedSkillsRepository = require('../models/fetched-skills/repository');
const fetchedSkillToDto = require('./dtos/fetched-skill');
const skillsAssociationToDto = require('./dtos/skills-associations');

class FetchedSkillsController {
  async getFetchedSkills (ctx) {
    const fetchedSkills = await FetchedSkillsRepository.findAll(ctx.request.query);

    ctx.ok({
      result: true,
      response: fetchedSkills.map(fetchedSkillToDto),
    });
  }

  async getAssociationsForSkills (ctx) {
    const associations = await FetchedSkillsRepository.findAllAssociations();

    const response = associations.reduce((total, rawAssociation) => {
      const association = skillsAssociationToDto(rawAssociation);
      if (!total[association.firstSkillId]) {
        total[association.firstSkillId] = {};
      }
      if (!total[association.secondSkillId]) {
        total[association.secondSkillId] = {};
      }

      total[association.firstSkillId][association.secondSkillId] = {
        skillId: association.secondSkillId,
        count: association.count,
      };
      total[association.secondSkillId][association.firstSkillId] = {
        skillId: association.firstSkillId,
        count: association.count,
      };
      return total;
    }, {});

    ctx.ok({
      result: true,
      response: response,
    });
  }
}

module.exports = new FetchedSkillsController();
