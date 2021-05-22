module.exports = function Association (association) {
  return {
    id: Number(association.id),
    firstSkillId: Number(association.first_skill_id),
    secondSkillId: Number(association.second_skill_id),
    count: Number(association.count),
  };
};
