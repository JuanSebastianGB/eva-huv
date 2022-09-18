'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CorrectiveMaintenance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CorrectiveMaintenance.belongsTo(models.Device);
    }
  }
  CorrectiveMaintenance.init(
    {
      reportDate: DataTypes.DATE,
      deadLineDate: DataTypes.DATE,
      deviceId: DataTypes.INTEGER,
      providerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CorrectiveMaintenance',
    }
  );
  return CorrectiveMaintenance;
};
