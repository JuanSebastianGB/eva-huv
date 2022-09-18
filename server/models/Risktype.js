'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RiskType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RiskType.hasMany(models.Device);
    }
  }
  RiskType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'RiskType',
    }
  );
  return RiskType;
};
