module.exports = function SpecForSkill (skill) {
  return {
    id: Number(skill['Skill.id']),
    title: skill['Skill.title'],
    is_enabled: skill['Skill.is_enabled'],
    specializations: [{
      id: Number(skill['Specialization.id']),
      title: skill['Specialization.title'],
    }],
  };
};
