'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcquisitionType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AcquisitionType.hasMany(models.Acquisition);
    }
  }
  AcquisitionType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'AcquisitionType',
    }
  );
  return AcquisitionType;
};
