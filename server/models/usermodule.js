'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserModule.init(
    {
      read: DataTypes.BOOLEAN,
      update: DataTypes.BOOLEAN,
      del: DataTypes.BOOLEAN,
      create: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      moduleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserModule',
    }
  );
  return UserModule;
};
