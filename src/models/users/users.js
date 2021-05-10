const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
  }

  User.init({
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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'users',
    timestamps: false,
    sequelize: sequelize,
  });

  return User;
};
