'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SparePartNeeded extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SparePartNeeded.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    preventiveMaintenanceId: DataTypes.INTEGER,
    ticketId: DataTypes.INTEGER,
    noteId: DataTypes.INTEGER,
    correctiveMaintenanceId: DataTypes.INTEGER,
    noteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SparePartNeeded',
  });
  return SparePartNeeded;
};