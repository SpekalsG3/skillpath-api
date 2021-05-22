module.exports = function User (user) {
  return {
    id: Number(user.id),
    username: user.username,
    email: user.email,
  };
};
