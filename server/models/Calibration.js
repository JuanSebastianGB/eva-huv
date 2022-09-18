'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calibration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Calibration.belongsTo(models.Device);
    }
  }
  Calibration.init(
    {
      description: DataTypes.STRING,
      file: DataTypes.STRING,
      deviceId: DataTypes.INTEGER,
      calibrationDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Calibration',
    }
  );
  return Calibration;
};
