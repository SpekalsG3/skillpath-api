module.exports = function UserPreference (preference) {
  return {
    userId: Number(preference.user_id),
    skillId: Number(preference.skill_id),
  };
};
