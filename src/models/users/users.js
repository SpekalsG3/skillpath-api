const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Skill extends Model {
  }

  Skill.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'skills',
    timestamps: false,
    sequelize: sequelize,
  });

  return Skill;
};
