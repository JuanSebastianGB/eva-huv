'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Technology extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Technology.belongsToMany(models.Device, {
        through: 'Device_Technologies',
      });
    }
  }
  Technology.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Technology',
    }
  );
  return Technology;
};
