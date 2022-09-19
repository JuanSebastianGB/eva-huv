const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Manual extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Manual.belongsToMany(models.Device, {
        through: models.DeviceManual,
      });
    }
  }
  Manual.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Manual',
    }
  );
  return Manual;
};
