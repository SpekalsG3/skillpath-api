const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserPreferences extends Model {
  }

  UserPreferences.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    skill_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'user_preferences',
    timestamps: false,
    sequelize: sequelize,
  });

  return UserPreferences;
};
