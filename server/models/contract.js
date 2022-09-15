'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contract.hasMany(models.Plan);
    }
  }
  Contract.init(
    {
      code: DataTypes.STRING,
      description: DataTypes.STRING,
      file: DataTypes.STRING,
      startDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Contract',
    }
  );
  return Contract;
};
