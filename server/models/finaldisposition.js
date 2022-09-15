'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FinalDisposition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FinalDisposition.init({
    description: DataTypes.STRING,
    finalDispositionDate: DataTypes.DATE,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FinalDisposition',
  });
  return FinalDisposition;
};