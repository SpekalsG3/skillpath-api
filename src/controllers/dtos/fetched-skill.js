module.exports = (fetchedSkill) => {
  return {
    id: Number(fetchedSkill['Skill.id']),
    title: fetchedSkill['Skill.title'],
    count: Number(fetchedSkill.count),
  };
};
