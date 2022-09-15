'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreventiveMaintenance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PreventiveMaintenance.init({
    description: DataTypes.STRING,
    file: DataTypes.STRING,
    deviceId: DataTypes.INTEGER,
    preventiveMaintenanceDate: DataTypes.DATE,
    providerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PreventiveMaintenance',
  });
  return PreventiveMaintenance;
};